import "dotenv/config.js";
import express from "express";
import { config } from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import projectsRoutes from "./routes/projects_routes.js";
import morgan from 'morgan'
import homeRoutes from "./routes/home_routes.js";
import userRoutes from "./routes/user_routes.js";
import db from "./db/connection.js";

config();

const PORT = process.env.PORT || 8080;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://co-lab-livid.vercel.app",
    methods: ["GET", "POST"],
    credentials: true
  }
});

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    name: 'connect.sid',
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: 'None',  
    secure: true,
    domain: '.co-lab-livid.vercel.app',
  },
};

app.use(cors({
  origin: "https://co-lab-livid.vercel.app",
  methods: ["GET", "POST"],
  credentials: true
}));
app.use((req, res, next) => {
  console.log('Cookies:', req.cookies);
  next();
});

app.options('*', cors());
app.use(express.json());
app.use(cookieParser());

app.use(session(sessionOptions));

app.get("/", (req, res) => {
  res.send("Welcome to CoLab!, this backend is deployed on reder!");
});

app.use("/api/projects", projectsRoutes);
app.use("/api/dashboard", homeRoutes);
app.use("/api", userRoutes);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinProject", (projectId) => {
    socket.join(projectId);
    console.log(`User joined project: ${projectId}`);
  });

  socket.on("sendMessage", (messageData) => {
    const { projectId, message } = messageData;
    io.to(projectId).emit("receiveMessage", message);
  });

  socket.on("joinRoom", ({ userId }) => {
    socket.join(userId);
    console.log(`User ${userId} joined room ${userId}`);
  });

  socket.on("typing", ({ projectId, userId }) => {
    socket.to(projectId).emit("userTyping", { userId });
  });

  socket.on("stopTyping", ({ projectId, userId }) => {
    socket.to(projectId).emit("userStopTyping", { userId });
  });

  socket.on("sendNotification", (notificationData) => {
    const { user_id, notification } = notificationData;
    io.to(user_id).emit("receiveNotification", notification);
    console.log(`Notification sent to user ${user_id}: ${notification}`);
  });

  socket.on("sendRequest", (requestData) => {
    const { user_id, request } = requestData;
    io.to(user_id).emit("receiveRequest", request);
    console.log(`Request sent to user ${user_id}: ${request}`);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});


export { io };

server.listen(PORT, () => {
  console.log(process.env.DATABASE_URL);
  console.log("Server is running on port", PORT);
});

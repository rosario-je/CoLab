import "dotenv/config.js";
import express from "express";
import { config } from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import projectsRoutes from "./routes/projects_routes.js";
import homeRoutes from "./routes/home_routes.js";
import userRoutes from "./routes/user_routes.js";
import db from "./db/connection.js";

config();

const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.options('*', cors())
app.use(express.json());
app.use(cookieParser());

// Middleware for Auth, session secret should be in .env file
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === "production" },
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to CoLab!");
});

app.use("/api/projects", projectsRoutes)
app.use("/api/dashboard", homeRoutes)
app.use("/api", userRoutes)



app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

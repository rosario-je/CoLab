import "dotenv/config.js";
import express from 'express';
import { config } from 'dotenv';
import session from 'express-session';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import chatsRoutes from './routes/chats_routes.js';
import projectsRoutes from './routes/projects_routes.js';
import homeRoutes from './routes/home_routes.js';
import userRoutes from './routes/user_routes.js';
import db from './db/connection.js';

config({path: '../.env'});

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

// Middleware for Auth, session secret should be in .env file
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

app.get('/', (req, res) => {
  res.send('Welcome to CoLab!');
});

app.use("/chats", chatsRoutes)
app.use("/projects", projectsRoutes)
app.use("/dashboard", homeRoutes)
app.use("/api", userRoutes)



app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
import express from 'express';
import { config } from 'dotenv';
import db from './db/connection.js';

config();

const PORT = process.env.PORT || 5000;
const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to CoLab!');
});

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
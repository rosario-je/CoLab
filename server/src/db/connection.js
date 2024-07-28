import pg from 'pg';
import { config } from 'dotenv';

config();
// config({path: '../.env'});

const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

const db = new pg.Pool(dbParams);


// TO RESET THE DATABASE RUN THE COMMAND: npm run db:reset
db.connect()
  .then(() => console.log('Connected to the database final project'))
  .catch(err => console.error('Database connection error:', err));

export default db;
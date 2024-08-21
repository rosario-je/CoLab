import pg from 'pg';
import { config } from 'dotenv';

config();

// const dbParams = {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// };

const dbParams = {
  connectionString: process.env.SUPABASE_URL,
  ssl: {
    rejectUnauthorized: false,
    require: true,
  },
  log: console.log 
};


const db = new pg.Pool(dbParams);


// TO RESET THE DATABASE RUN THE COMMAND: npm run db:reset
db.connect()
  .then(() => console.log('Connected to the database', process.env.DB_NAME))
  .catch(err => console.error('Database connection error:', err));

export default db;
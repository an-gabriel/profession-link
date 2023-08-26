import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
});

pool.on('error', (err, client) => {
  console.error('Error connecting to database:', err);
});

pool.on('connect', () => {
  console.log('Database connection successfully made');
});

export default pool;

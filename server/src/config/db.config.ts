import { Pool, PoolClient } from 'pg';

interface DatabaseConfig {
  user: string;
  password: string;
  host: string;
  port: number;
  database: string;
}

const poolConfig: DatabaseConfig = {
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  host: process.env.DB_HOST || '',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || '',
};

const pool = new Pool(poolConfig);

pool.on('error', (err: Error, client: PoolClient) => {
  console.error('Error connecting to database:', err);
});

pool.on('connect', () => {
  console.log('Database connection successfully made');
});

export default pool;

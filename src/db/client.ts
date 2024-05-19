import 'dotenv/config';
import postgres from 'postgres';

export const sql = postgres({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? ''),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
});

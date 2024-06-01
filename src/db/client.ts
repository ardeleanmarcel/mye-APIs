import 'dotenv/config';
import postgres from 'postgres';
import knex from 'knex';

// TODO (Valle) -> remove 'postgres' library and replace usage with knex
export const sql = postgres({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
});

export const knexClient = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '5432'),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  },
  // TODO (Valle) -> should config search path based on environment
  searchPath: ['development', 'public'],
});

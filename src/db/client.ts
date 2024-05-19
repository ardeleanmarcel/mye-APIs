import postgres from 'postgres';

export const sql = postgres({
  host: 'localhost',
  port: 3033,
  database: 'mye',
  user: 'myeadmin',
  pass: 'myepass',
});

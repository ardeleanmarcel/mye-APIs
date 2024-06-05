import { UserCreateType, UserType } from '../../models/user.models';
import { sql } from '../client';
import { sqlClient } from '@src/adapters/sqlClient';
import { Filter } from '../db.utils';
import { composeWhereClause } from './utils/sql.utils';

// TODO (Valle) -> enhance this to enable creation of multiple users
export async function createUsers(users: UserCreateType[]) {
  return (await sql`
      INSERT INTO users
        (username, password)
      VALUES
        ( ${users[0].username} , ${users[0].password} )
      RETURNING *
    `) as UserType[];
}

// TODO (Valle) -> add "created_at" column to users table
// TODO (Valle) -> add seed script for root admin

type AllowedUserFilters = 'username';
export async function selectUsers(filters: Filter<AllowedUserFilters>[]) {
  const { whereClauses, bindings } = composeWhereClause(filters);

  const query = `SELECT * FROM users ${whereClauses}`;

  const res = await sqlClient.queryWithParams<UserType>(`SELECT * FROM users ${whereClauses}`, bindings);

  return res;
}

import { UserCreateType, UserType } from '../../models/user.models';
import { sql } from '../client';
import { sqlClient } from '@src/adapters/sqlClient';
import { ArrayFilter, FILTER_TYPE, Filter, FilterType, FilterValue } from '../utils';

// import { FILTER_TYPE, Filter } from '../utils';

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

// type SelectUsersFilters = Filter<'id' | 'name'>[];

// TODO (Valle) -> add "created_at" column to users table
// TODO (Valle) -> add seed script for root admin
// TODO (Valle) -> add where clause composition
// TODO (Valle) -> replace knex client "direct usage" with an adapter pattern layer
export async function selectUsers(filters: Filter[]) {
  let whereClause = '';
  let bindings: FilterValue[] = [];
  if (filters.length > 0) whereClause += 'WHERE\n';

  function isArrayFilter(filter: Filter): filter is ArrayFilter {
    return filter.type === FILTER_TYPE.In;
  }

  filters.map((f) => {
    if (isArrayFilter(f)) {
      whereClause += `${f.name} IN ( ${f.value.map(() => ' ? ').join(',')} )`;
      bindings = [...bindings, ...f.value];
    }
  });

  const query = `SELECT * FROM users ${whereClause}`;
  console.log('query', query);

  const res = await sqlClient.queryWithParams<UserType>(`SELECT * FROM users ${whereClause}`, bindings);

  return res;
}

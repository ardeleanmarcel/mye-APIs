import { UserCreateType, UserSelectType } from '../../models/user.models';
import { sql } from '../client';

export async function createUsers(users: UserCreateType[]) {
  return (await sql`
      INSERT INTO users
        (username, password)
      VALUES
        ( ${users[0].username} , ${users[0].password} )
      RETURNING *
    `) as UserSelectType[];
}

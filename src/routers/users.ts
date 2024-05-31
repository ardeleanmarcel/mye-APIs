import { t } from '@src/trpc';

import { hash } from 'bcrypt';
import lodash from 'lodash';

import { DEFAULT_SALT_ROUNDS } from '../constants/auth.const';
import { userCreateSchema } from '../models/user.models';
import { createUsers } from '../db/sql/users.sql';

const { pick } = lodash;

export const users = t.router({
  getUserById: t.procedure.query((opts) => {
    return 'gigel';
  }),
  createUser: t.procedure.input(userCreateSchema).mutation(async (opts) => {
    const { username, password } = opts.input;

    const hashedPassword = await hash(password, DEFAULT_SALT_ROUNDS);

    const user = (await createUsers([{ username, password: hashedPassword }]))[0];

    const data = pick(user, ['user_id', 'username']);

    return data;
  }),
});

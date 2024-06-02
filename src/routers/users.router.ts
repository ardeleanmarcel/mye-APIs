import { hash } from 'bcrypt';
import lodash from 'lodash';

import { t } from '@src/trpc';
import { DEFAULT_SALT_ROUNDS } from '@constants/auth.const';
import { userCreateSchema } from '@models/user.models';
import { createUsers, selectUsers } from '@sql/users.sql';

import { createInputSchema } from './utils/router.utils';

const { pick } = lodash;

const getUsersInputSchema = createInputSchema({ username: 'string' });

export const usersRouter = t.router({
  get: t.procedure.input(getUsersInputSchema).query(async (opts) => {
    console.log('opts.input', opts.input);

    const r = await selectUsers(opts.input);
    return r;
  }),

  create: t.procedure.input(userCreateSchema).mutation(async (opts) => {
    const { username, password } = opts.input;

    const hashedPassword = await hash(password, DEFAULT_SALT_ROUNDS);
    const user = (await createUsers([{ username, password: hashedPassword }]))[0];
    const data = pick(user, ['user_id', 'username']);

    return data;
  }),
});

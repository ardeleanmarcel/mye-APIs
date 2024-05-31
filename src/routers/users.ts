import { hash } from 'bcrypt';
import lodash from 'lodash';

import { t } from '@src/trpc';
import { DEFAULT_SALT_ROUNDS } from '@constants/auth.const';
import { userCreateSchema } from '@models/user.models';
import { createUsers } from '@sql/users.sql';

const { pick } = lodash;

export const usersRouter = t.router({
  // TODO (Valle) -> make this accept an array?
  get: t.procedure.query((opts) => {
    return 'gigel';
  }),
  create: t.procedure.input(userCreateSchema).mutation(async (opts) => {
    const { username, password } = opts.input;

    const hashedPassword = await hash(password, DEFAULT_SALT_ROUNDS);
    const user = (await createUsers([{ username, password: hashedPassword }]))[0];
    const data = pick(user, ['user_id', 'username']);

    return data;
  }),
});

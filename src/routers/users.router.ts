import { hash } from 'bcrypt';
import lodash from 'lodash';

import { protectedProcedure, t } from '@src/trpc';
import { DEFAULT_SALT_ROUNDS } from '@constants/auth.const';
import { userCreateSchema } from '@models/user.models';
import { createUsers, selectUsers } from '@sql/users.sql';

import { createInputSchema } from './utils/router.utils';

import { Filter } from '@src/db/db.utils';
import { HTTP_ERR, HttpError } from '@src/errors';
import { notificationService, EMAIL_TYPE } from '@src/adapters/service.notification';

const { pick } = lodash;

const USER_FILTERS = { username: 'string' } as const;
type UserFilterNames = keyof typeof USER_FILTERS;

const getUsersInputSchema = createInputSchema(USER_FILTERS);

export const usersRouter = t.router({
  // TODO (Valle) -> this route should not be accessible to "anyone"
  get: protectedProcedure.input(getUsersInputSchema).query(async (opts) => {
    const r = await selectUsers(opts.input as Filter<UserFilterNames>[]);
    return r;
  }),

  create: t.procedure.input(userCreateSchema).mutation(async (opts) => {
    const { username, password, email } = opts.input;
    const {
      ctx: { res },
    } = opts;

    // TODO (Valle) -> setting status like this doesn't work. find another way
    res.status(202);

    const hashedPassword = await hash(password, DEFAULT_SALT_ROUNDS);
    const user = (await createUsers([{ username, password: hashedPassword, email }]))[0];
    await notificationService.sendEmail({
      id: EMAIL_TYPE.ConfirmNewUserEmail.id,
      email,
      userId: user.user_id,
      username,
    });

    const data = pick(user, ['user_id', 'username', 'email']);
    return data;
  }),
});

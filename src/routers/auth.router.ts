import { z } from 'zod';
import { compare } from 'bcrypt';

import { t } from '@src/trpc';
import { selectUsers } from '@src/db/sql/users.sql';

export const signInSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(8).max(20),
});

export const authRouter = t.router({
  signIn: t.procedure.input(signInSchema).mutation(async (opts) => {
    const { username, password } = opts.input;

    const user = (await selectUsers([{ name: 'username', type: 'IN', value: [username] }]))[0];

    // TODO (Valle) -> should throw? 400?
    if (!user) return false;

    const isAllowed = await compare(password, user.password);
    // TODO (Valle) -> create and return token

    return isAllowed;
  }),
});

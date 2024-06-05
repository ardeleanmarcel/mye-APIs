import { z } from 'zod';

import { t } from '@src/trpc';
import { selectUsers } from '@src/db/sql/users.sql';

export const signInSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(8).max(20),
});

export const authRouter = t.router({
  signIn: t.procedure.input(signInSchema).mutation(async (opts) => {
    const { username, password } = opts.input;

    const user = (await selectUsers([{ name: 'username', type: 'IN', value: ['gigel'] }]))[0];

    console.log('username', username);
    console.log('password', password);
    console.log('user.password', user.password);

    return 'gonna sign in soon';
  }),
});

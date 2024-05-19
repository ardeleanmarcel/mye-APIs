import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { hash } from 'bcrypt';

import { DEFAULT_SALT_ROUNDS } from './constants/auth.const';
import { userCreateSchema } from './models/user.models';
import { createUsers } from './db/sql/users.sql';

export const t = initTRPC.create();

export const appRouter = t.router({
  getUserById: t.procedure.input(z.string()).query((opts) => {
    return 'gigel';
  }),

  createUser: t.procedure.input(userCreateSchema).mutation(async (opts) => {
    const { username, password } = opts.input;

    const hashedPassword = await hash(password, DEFAULT_SALT_ROUNDS);

    const user = (await createUsers([{ username, password: hashedPassword }]))[0];

    return user;
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

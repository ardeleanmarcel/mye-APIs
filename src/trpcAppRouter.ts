import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { hash } from 'bcrypt';

import { DEFAULT_SALT_ROUNDS } from './constants/auth.const';

const userDataSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(8).max(20),
});

const userSchema = userDataSchema.merge(
  z.object({
    id: z.string(),
  })
);

type UserType = z.infer<typeof userSchema>;

const users: Record<string, UserType> = {};

export const t = initTRPC.create();

export const appRouter = t.router({
  getUserById: t.procedure.input(z.string()).query((opts) => {
    return users[opts.input]; // input type is string
  }),

  createUser: t.procedure.input(userDataSchema).mutation(async (opts) => {
    const id = Date.now().toString();

    const { username, password } = opts.input;

    console.log('username', username);
    console.log('password', password);

    const hashedPassword = await hash(password, DEFAULT_SALT_ROUNDS);
    console.log('hashedPassword', hashedPassword);

    const user: UserType = { id, ...opts.input };
    users[user.id] = user;

    return user;
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

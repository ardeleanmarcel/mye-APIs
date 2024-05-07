import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const userDataSchema = z.object({
  name: z.string().min(3),
  bio: z.string().max(142).optional(),
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
  createUser: t.procedure.input(userDataSchema).mutation((opts) => {
    const id = Date.now().toString();

    const user: UserType = { id, ...opts.input };
    users[user.id] = user;

    return user;
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

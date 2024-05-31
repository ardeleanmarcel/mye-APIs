import { t } from '@src/trpc';
import { authRouter, usersRouter } from '@routers';

export const appRouter = t.router({
  users: usersRouter,
  auth: authRouter,
});

// Here we export the type definition of the API
export type AppRouter = typeof appRouter;

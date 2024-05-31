import { t } from '@src/trpc';
import { users } from '@routers/users';

export const appRouter = t.router({
  users,
});

// Here we export the type definition of the API
export type AppRouter = typeof appRouter;

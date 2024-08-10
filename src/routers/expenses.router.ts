import { z } from 'zod';

import { protectedProcedure, t } from '@src/trpc';

export const addExpenseSchema = z
  .object({
    description: z.string().min(3).max(50),
    amount: z
      .number()
      .positive()
      .lt(1_000_000_000_000)
      .refine((num) => {
        const asString = String(num);
        const decimals = asString.split('.')[1];
        return !decimals || decimals.length < 3;
      }, 'amount should be a number with maximum 2 decimals'),
    date_expended_at: z.string().date(),
  })
  .strict();

export const expensesRouter = t.router({
  add: protectedProcedure.input(addExpenseSchema).mutation(async (opts) => {
    const { user } = opts.ctx;

    const { amount, date_expended_at, description } = opts.input;

    console.log('user', user);
    console.log('amount', amount);
    console.log('date_expended_at', date_expended_at);
    console.log('description', description);

    return 'okie';
  }),
});

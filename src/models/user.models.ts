import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  username: z.string().min(3).max(20),
  password: z.string().min(8).max(20),
});

export const userCreateSchema = userSchema.pick({
  username: true,
  password: true,
});

export const userSelectSchema = userSchema.pick({
  id: true,
  username: true,
});

export type UserType = z.infer<typeof userSchema>;
export type UserCreateType = z.infer<typeof userCreateSchema>;
export type UserSelectType = z.infer<typeof userCreateSchema>;

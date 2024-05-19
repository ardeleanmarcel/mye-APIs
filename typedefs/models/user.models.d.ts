import { z } from 'zod';
export declare const userSchema: z.ZodObject<{
    user_id: z.ZodString;
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    user_id: string;
    password: string;
}, {
    username: string;
    user_id: string;
    password: string;
}>;
export declare const userCreateSchema: z.ZodObject<Pick<{
    user_id: z.ZodString;
    username: z.ZodString;
    password: z.ZodString;
}, "username" | "password">, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export type UserType = z.infer<typeof userSchema>;
export type UserCreateType = z.infer<typeof userCreateSchema>;

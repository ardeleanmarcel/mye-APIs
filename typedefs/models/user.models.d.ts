import { z } from 'zod';
export declare const userSchema: z.ZodObject<{
    user_id: z.ZodNumber;
    username: z.ZodString;
    password: z.ZodString;
    email: z.ZodString;
    user_status_id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    username: string;
    email: string;
    user_id: number;
    password: string;
    user_status_id: number;
}, {
    username: string;
    email: string;
    user_id: number;
    password: string;
    user_status_id: number;
}>;
export declare const userCreateSchema: z.ZodObject<Pick<{
    user_id: z.ZodNumber;
    username: z.ZodString;
    password: z.ZodString;
    email: z.ZodString;
    user_status_id: z.ZodNumber;
}, "username" | "email" | "password">, "strict", z.ZodTypeAny, {
    username: string;
    email: string;
    password: string;
}, {
    username: string;
    email: string;
    password: string;
}>;
export type UserType = z.infer<typeof userSchema>;
export type UserCreateType = z.infer<typeof userCreateSchema>;

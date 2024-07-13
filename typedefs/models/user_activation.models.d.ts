import { z } from 'zod';
export declare const userActivationSchema: z.ZodObject<{
    user_id: z.ZodString;
    activation_code: z.ZodString;
    expires_at: z.ZodString;
    is_used: z.ZodBoolean;
}, "strict", z.ZodTypeAny, {
    user_id: string;
    activation_code: string;
    expires_at: string;
    is_used: boolean;
}, {
    user_id: string;
    activation_code: string;
    expires_at: string;
    is_used: boolean;
}>;
export type UserActivationType = z.infer<typeof userActivationSchema>;
export type UserActivationDbData = Pick<UserActivationType, 'user_id' | 'activation_code' | 'is_used'> & {
    expires_at: Date;
};
export type UserActivationUpdate = Pick<UserActivationType, 'activation_code'>;

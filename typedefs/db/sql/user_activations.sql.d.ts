import { UserActivationDbData } from '../../models/user_activation.models';
export declare function createUserActivations(userIds: number[]): Promise<UserActivationDbData[]>;
export declare function selectUserActivations(activationCodes: string[]): Promise<UserActivationDbData[]>;
export declare function updateUserActivations(activationCodes: string[]): Promise<UserActivationDbData[]>;

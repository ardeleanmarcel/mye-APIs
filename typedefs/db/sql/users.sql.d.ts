import { UserCreateType } from '../../models/user.models';
import { Filter } from '../db.utils';
export declare function createUsers(users: UserCreateType[]): Promise<{
    username: string;
    email: string;
    user_id: number;
    password: string;
    user_status_id: number;
}[]>;
type AllowedUserFilters = 'username' | 'user_status_id';
export declare function selectUsers(filters: Filter<AllowedUserFilters>[]): Promise<{
    username: string;
    email: string;
    user_id: number;
    password: string;
    user_status_id: number;
}[]>;
export {};

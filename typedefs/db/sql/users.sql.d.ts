import { UserCreateType } from '../../models/user.models';
export declare function createUsers(users: UserCreateType[]): Promise<{
    username: string;
    user_id: string;
    password: string;
}[]>;

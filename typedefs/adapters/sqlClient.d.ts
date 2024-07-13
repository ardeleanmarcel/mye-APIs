import { Knex } from 'knex';
declare class SqlClient {
    private client;
    constructor();
    query<T>(text: string): Promise<T[]>;
    queryWithParams<T>(text: string, bindings: Knex.RawBinding): Promise<T[]>;
}
export declare const sqlClient: SqlClient;
export {};

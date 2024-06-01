import { Knex } from 'knex';
import { knexClient } from '@src/db/client';

class SqlClient {
  private client: Knex;
  constructor() {
    this.client = knexClient;
  }

  public async query<T>(text: string) {
    const res = await this.client.raw(text);

    return res.rows as T[];
  }

  public async queryWithParams<T>(text: string, bindings: Knex.RawBinding) {
    const res = await this.client.raw(text, bindings);

    return res.rows as T[];
  }
}

export const sqlClient = new SqlClient();

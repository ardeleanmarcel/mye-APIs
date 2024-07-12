import { randomUUID } from 'crypto';
import { sqlClient } from '@src/adapters/sqlClient';
import { UserActivationType } from '../../models/user_activation.models';

type UserActivationDbData = Pick<UserActivationType, 'user_id' | 'activation_code' | 'is_used'> & { expires_at: Date };

export function createUserActivations(userIds: number[]) {
  const values = new Array(userIds.length)
    .fill(null)
    .map(() => `( ?, ? )`)
    .join(',\n');

  const bindings = userIds.map((u) => [u, randomUUID()]).reduce((b, u) => [...b, ...u]);

  const query = `
    INSERT INTO user_activations
      (user_id, activation_code)
    VALUES
      ${values}
    RETURNING *
  `;

  return sqlClient.queryWithParams<UserActivationDbData>(query, bindings);
}

import { hash } from 'bcrypt';
import lodash from 'lodash';

import { t } from '@src/trpc';
import { DEFAULT_SALT_ROUNDS } from '@constants/auth.const';
import { userCreateSchema } from '@models/user.models';
import { createUsers, selectUsers } from '@sql/users.sql';
import { FILTER_TYPE } from '@src/db/utils';
import { z } from 'zod';

const queryInputSchema = z.array(
  z
    .object({
      name: z.string(),
      type: z.enum([FILTER_TYPE.In]),
      value: z.union([z.string(), z.number(), z.array(z.number()), z.array(z.string())]),
    })
    .strict()
);

type FilterSchemaConfig = {
  [x: string]: 'string' | 'number';
};

function createInputSchema(cfg: FilterSchemaConfig) {
  const filterNames = Object.keys(cfg);

  return queryInputSchema.refine(
    (data) =>
      data.every((f) => {
        if (!filterNames.includes(f.name)) return false;

        const filterType = cfg[f.name];

        if (f.type === FILTER_TYPE.In) {
          return Array.isArray(f.value) && f.value.every((val) => typeof val === filterType);
        }

        return typeof f.value === filterType;
      }),
    { message: 'Input does not resepect filter schema' }
  );
}

const { pick } = lodash;

const getUsersInputSchema = createInputSchema({ username: 'string' });

export const usersRouter = t.router({
  // TODO (Valle) -> crate generic filter options?
  get: t.procedure.input(getUsersInputSchema).query(async (opts) => {
    console.log('opts.input', opts.input);

    const r = await selectUsers(opts.input);
    return r;
  }),

  create: t.procedure.input(userCreateSchema).mutation(async (opts) => {
    const { username, password } = opts.input;

    const hashedPassword = await hash(password, DEFAULT_SALT_ROUNDS);
    const user = (await createUsers([{ username, password: hashedPassword }]))[0];
    const data = pick(user, ['user_id', 'username']);

    return data;
  }),
});

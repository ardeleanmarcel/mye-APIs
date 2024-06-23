import { initTRPC } from '@trpc/server';
import { ZodError } from 'zod';
import { HttpError } from './errors';

export const t = initTRPC.create({
  errorFormatter: (opts) => {
    const { shape, error } = opts;

    if (error.cause instanceof HttpError) {
      return {
        message: error.cause.message,
        data: {
          httpStatus: error.cause.httpCode,
          errorCode: error.cause.errorCode,
        },
      };
    }

    // TODO (Valle) -> zod errors should follow the same shape as returned when HttpError is encountered
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.code === 'BAD_REQUEST' && error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

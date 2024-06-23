export const HTTP_ERR = {
  e400: {
    BadCredentials: {
      errorCode: 401001,
      httpCode: 401,
      message: 'Invalid credentials.',
    },
  },
} as const;

export const HTTP_ERR = {
  e400: {
    BadCredentials: {
      errorCode: 400001,
      httpCode: 400,
      message: 'Invalid credentials.',
    },
  },
  e401: {
    Unauthorized: {
      errorCode: 401001,
      httpCode: 401,
      message: 'Missing required authorization.',
    },
  },
  e500: {
    Unavailable: {
      errorCode: 500001,
      httpCode: 500,
      message: 'A service required is currently unavailable.',
    },
  },
} as const;

interface HttpErrorArgs {
  errorCode: number;
  httpCode: number;
  message: string;
}

export class HttpError extends Error {
  errorCode: number;
  httpCode: number;
  message: string;

  constructor({ errorCode, httpCode, message }: HttpErrorArgs) {
    super(message);

    this.errorCode = errorCode;
    this.httpCode = httpCode;
    this.message = message;
  }

  // TODO (Valle) -> add a toString() method?
}

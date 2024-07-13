interface HttpErrorArgs {
    errorCode: number;
    httpCode: number;
    message: string;
}
export declare class HttpError extends Error {
    errorCode: number;
    httpCode: number;
    message: string;
    constructor({ errorCode, httpCode, message }: HttpErrorArgs);
}
export {};

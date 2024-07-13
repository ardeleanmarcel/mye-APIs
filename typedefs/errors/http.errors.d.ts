export declare const HTTP_ERR: {
    readonly e400: {
        readonly BadCredentials: {
            readonly errorCode: 400001;
            readonly httpCode: 400;
            readonly message: "Invalid credentials.";
        };
        readonly ResourceConsumed: (name: string, value: string) => {
            errorCode: number;
            httpCode: number;
            message: string;
        };
        readonly ResourceExpired: (name: string, value: string) => {
            errorCode: number;
            httpCode: number;
            message: string;
        };
    };
    readonly e401: {
        readonly Unauthorized: {
            readonly errorCode: 401001;
            readonly httpCode: 401;
            readonly message: "Missing required authorization.";
        };
    };
    readonly e404: {
        readonly NotFound: (name: string, value: string) => {
            errorCode: number;
            httpCode: number;
            message: string;
        };
    };
    readonly e500: {
        readonly Unavailable: {
            readonly errorCode: 500001;
            readonly httpCode: 500;
            readonly message: "A service required is currently unavailable.";
        };
    };
};

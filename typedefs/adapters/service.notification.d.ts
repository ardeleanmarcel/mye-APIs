import sendGrid from '@sendgrid/mail';
export declare const EMAIL_TYPE: {
    readonly ConfirmNewUserEmail: {
        readonly id: "ConfirmNewUserEmail";
    };
};
declare class NotificationService {
    private emailClient;
    constructor();
    sendAccountConfirmationEmail(cfg: {
        email: string;
        username: string;
        confirmationUrl: string;
    }): Promise<[sendGrid.ClientResponse, {}]>;
}
export declare const notificationService: NotificationService;
export {};

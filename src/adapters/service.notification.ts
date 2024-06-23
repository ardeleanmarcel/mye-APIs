import sendGrid from '@sendgrid/mail';

import { HttpError, HTTP_ERR } from '../errors';

// TODO (Valle) -> cann i add type annotation to EMAIL_TYPE: EmailConfigObjects to some [key]: { specific: 'object' } shape?
export const EMAIL_TYPE = {
  ConfirmNewUserEmail: {
    id: 'ConfirmNewUserEmail',
  },
} as const;
// TODO (Valle) -> can I type this so that the keys can only be a subset of EMAIL_TYPE's keys?
const SENDGRID_TEMPLATE = {
  ConfirmNewUserEmail: 'd-58015a3de1ae41388cb70421f6e10224',
} as const;

function getSendgridTemplateId(id: keyof typeof EMAIL_TYPE) {
  return SENDGRID_TEMPLATE[id];
}

// TODO (Valle) -> improve this type
interface EmailTypeConfig {
  id: keyof typeof EMAIL_TYPE;
  templateArgs?: readonly string[];
}

class NotificationService {
  private emailClient: sendGrid.MailService;

  constructor() {
    this.emailClient = sendGrid;
    this.emailClient.setApiKey(process.env.SENDGRID_API_KEY ?? '');
  }

  // TODO (Valle) -> cfg type should depend on the email to be sent...
  public async sendEmail(cfg: EmailTypeConfig & { email: string; username: string; userId: string }) {
    const msg = {
      to: cfg.email,
      from: process.env.NOTIFICATION_EMAIL_SOURCE ?? '',
      subject: 'Confirm MYE account',
      text: 'Please click link to confirm email',
      html: '<strong>Please click link to confirm email</strong>',
    };

    await this.emailClient
      .send({
        ...msg,
        templateId: getSendgridTemplateId(cfg.id),
        dynamicTemplateData: {
          username: cfg.username,
          // TODO (Valle) -> update url
          confirmationUrl: `https://www.google.com/user/${cfg.userId}`,
        },
      })
      .catch((err) => {
        // TODO (Valle) -> improve error logging
        console.error(err);
        throw new HttpError(HTTP_ERR.e500.Unavailable);
      });
  }
}

export const notificationService = new NotificationService();

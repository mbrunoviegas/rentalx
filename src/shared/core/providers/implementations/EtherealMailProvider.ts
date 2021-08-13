import nodemailer, { Transporter } from 'nodemailer';
import { injectable } from 'tsyringe';
import { AppError } from '@shared/core/errors/AppError';
import { IMailProvider } from '../interfaces/IMailProvider';

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      this.client = transporter;
    }).catch((error) => {
      throw new AppError(error.message);
    });
  }

  async sendMail(to: string, subject: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      from: 'Rentx <noreply@rentx.com>',
      to,
      subject,
      html: body,
      text: body,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealMailProvider };

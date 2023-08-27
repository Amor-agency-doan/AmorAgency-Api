import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Account } from '~/modules/account/account.schema';

@Injectable()
export class MailService {
  constructor(
    private service: MailerService,
    private configService: ConfigService,
  ) {}

  public MAILER_INCOMING_USER = this.configService.get('MAILER_INCOMING_USER', '');

  public async forgotPassword(account: Account, code: number): Promise<any | null> {
    return this.service
      .sendMail({
        sender: this.MAILER_INCOMING_USER,
        to: account.email,
        from: this.MAILER_INCOMING_USER,
        subject: '[AMOR AGENCY] Forgot password',
        text: `   We will inform you of the authentication code to change your password.
                  4 digit authentication code：${code}    
                  Amor Agency`,
        html: `   <p>We will inform you of the authentication code to change your password.</p>
                  <p>4 digit authentication code：<b>${code}</b></p><br>
                  <p>Amor Agency</p>`,
      })
      .then((res) => {
        console.log('res', res);
        return res;
      })
      .catch((err) => {
        console.log('err', err);
        return null;
      });
  }

  public async registerUser(user: Account): Promise<any | null> {
    return this.service
      .sendMail({
        sender: this.MAILER_INCOMING_USER,
        to: user.email,
        from: this.MAILER_INCOMING_USER,
        subject: '[AMOR AGENCY] Welcome to JUSEI Master',
        html: `   <p>Password: ${user}</p>
                  <p>Amor Agency</p>`,
      })
      .then((res) => {
        // console.log('res', res);
        return res;
      })
      .catch((err) => {
        console.log('err', err);
        return null;
      });
  }

  public async sendFeedBack() {
    return await this.service.sendMail({
      to: 'vietanh123456123@gmail.com',
      subject: '[AMOR AGENCY] FEEDBACK',
      template: './feedback',
    });
  }
}

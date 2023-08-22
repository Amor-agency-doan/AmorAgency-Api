import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { Account } from '../account/account.schema';

@Injectable()
export class MailService {
  constructor(private service: MailerService, private configService: ConfigService) {}

  public MAILER_INCOMING_USER = this.configService.get('MAILER_INCOMING_USER', '');

  public async forgotPassword(account: Account, code: number): Promise<any | null> {    
    return this.service
      .sendMail({
        sender: this.MAILER_INCOMING_USER,
        to: account.email,
        from: this.MAILER_INCOMING_USER,
        subject: '[JUSEI] Forgot password',
        text: `パスワード変更するための認証コードをお知らせいたします。
              ４ケタの認証コード：${code}
              
              JUSEI Masterアプリで４ケタの認証コード入力画面に、半角数字で入力してください。
              
              ※認証コードは本人確認のための一時的な数字です。パスワードではありません。
              ※本メール にお心当たりのない方は破棄していただきますようお願い致します。
              
              お問い合わせ
              JUSEI Master事務局
              support@juseilab.com`,
        html: `<p>パスワード変更するための認証コードをお知らせいたします。</p>
              <p>４ケタの認証コード：<b>${code}</b></p><br>
              <p>JUSEI Masterアプリで４ケタの認証コード入力画面に、半角数字で入力してください。</p><br>
              <p>※認証コードは本人確認のための一時的な数字です。パスワードではありません。</p>
              <p>※本メール にお心当たりのない方は破棄していただきますようお願い致します。</p><br>
              <p>お問い合わせ</p>
              <p>JUSEI Master事務局</p>
              <p>support@juseilab.com</p>`,
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

  public async registerUser(user: Account): Promise<any | null> {
    return this.service
      .sendMail({
        sender: this.MAILER_INCOMING_USER,
        to: user.email,
        from: this.MAILER_INCOMING_USER,
        subject: '[JUSEI] Welcome to JUSEI Master',
        html: `<p>Password: ${user}</p>
              <p>JUSEI Master事務局</p>
              <p>support@juseilab.com</p>`,
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
}

import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const user = configService.get('MAILER_INCOMING_USER', '');
        const pass = configService.get('MAILER_INCOMING_PASS', '');
        const port = Number(configService.get('MAILER_INCOMING_PORT', '587'));
        
        return {
          transport: {
            host: 'smtp.gmail.com',
            port: port,
            ignoreTLS: false,
            secure: false,
            auth: {
              user: user,
              pass: pass,
            },
          },
          defaults: {
            from: '"No Reply" <no-reply@gmail.com>',
          },
          preview: true,
        };
      },
    }),
  ],
  controllers: [],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}

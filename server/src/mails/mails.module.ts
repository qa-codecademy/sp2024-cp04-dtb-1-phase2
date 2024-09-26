import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailsController } from './mails.controller';
import { MailsService } from './mails.service';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        transport: {
          // For relay SMTP server set the host to smtp-relay.gmail.com
          // and for Gmail STMO server set it to smtp.gmail.com
          host: configService.get('MAIL_HOST'),
          // For SSL and TLS connection
          secure: true,
          port: 465,
          service: 'gmail',
          auth: {
            // Account gmail address
            user: configService.get('MAIL_USER'),
            pass: configService.get('MAIL_PASS'),
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailsService],
  controllers: [MailsController],
  exports: [MailsService],
})
export class MailsModule {}

// "EmailHost": "",
// "EmailUsername": "",
// "EmailPassword": "",
// "EmailPort": "",
// "DKIMPrivateKey": "",
// "DKIMDomain": "",
// "DKIMSelector": "",

// https://easydmarc.com/tools/dkim-record-generator

// https://support.google.com/a/answer/174124?hl=en

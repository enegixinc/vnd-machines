import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@backend/config';
import { MailerModule as MailerModuleBase } from '@nestjs-modules/mailer';
import { MailerService } from './mailer.service';
import { TemplatesService } from './templates.service';

@Module({
  imports: [
    MailerModuleBase.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAIL_HOST'),
          port: configService.get('MAIL_PORT'),
          auth: {
            user: configService.get('MAIL_USER'),
            pass: configService.get('MAIL_PASSWORD'),
          },
        },
      }),
    }),
  ],
  providers: [MailerService, TemplatesService],
  exports: [MailerService, TemplatesService],
})
export class MailerModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { RequestsSubscriber } from './requests.subscriber';
import { FillRequestEntity, FillRequestProducts } from './fill-request.entity';
import { BullModule } from '@nestjs/bullmq';
import { RequestsProcessor } from './requests.processor';
import { MailerService } from '../../../services/mailer/mailer.service';
import { MailerModule } from '../../../services/mailer/mailer.module';

@Module({
  imports: [
    MailerModule,
    TypeOrmModule.forFeature([FillRequestEntity, FillRequestProducts]),
    BullModule.registerQueueAsync({
      name: 'requests',
    }),
  ],

  controllers: [RequestsController],
  providers: [
    RequestsService,
    RequestsSubscriber,
    RequestsProcessor,
    MailerService,
  ],
})
export class RequestsModule {}

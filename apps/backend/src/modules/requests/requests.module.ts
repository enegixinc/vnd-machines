import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { RequestsSubscriber } from './requests.subscriber';
import { FillRequestEntity, RequestEntity } from './request.entity';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@backend/config';
import { RequestsProcessor } from './requests.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([RequestEntity, FillRequestEntity]),
    BullModule.registerQueueAsync({
      name: 'requests',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        connection: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
          password: configService.get('REDIS_PASSWORD'),
        },
      }),
    }),
  ],

  controllers: [RequestsController],
  providers: [RequestsService, RequestsSubscriber, RequestsProcessor],
})
export class RequestsModule {}

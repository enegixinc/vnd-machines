import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from '@backend/magex-connector';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}

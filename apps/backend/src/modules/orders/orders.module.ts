import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from '@backend/magex-connector';
import { OrdersSubscriber } from './orders.subscriber';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './orders.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersSubscriber],
})
export class OrdersModule {}

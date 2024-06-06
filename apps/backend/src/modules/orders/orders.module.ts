import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersSubscriber } from './orders.subscriber';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { OrdersService } from './orders.service';
import { OrderProductsDetails } from './order-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, OrderProductsDetails])],
  controllers: [OrdersController],
  providers: [OrdersSubscriber, OrdersService],
})
export class OrdersModule {}

import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersSubscriber } from './orders.subscriber';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './orders.entity';
import { OrdersService } from './orders.service';
import { OrderProduct } from './order-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, OrderProduct])],
  controllers: [OrdersController],
  providers: [OrdersSubscriber, OrdersService],
})
export class OrdersModule {}

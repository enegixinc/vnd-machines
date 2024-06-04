import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersSubscriber } from './orders.subscriber';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './orders.entity';
import { OrdersService } from './orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  controllers: [OrdersController],
  providers: [OrdersSubscriber, OrdersService],
})
export class OrdersModule {}

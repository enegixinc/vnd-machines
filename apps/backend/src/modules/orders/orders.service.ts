import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { OrderEntity } from './orders.entity';

@Injectable()
export class OrdersService extends TypeOrmCrudService<OrderEntity> {
  constructor(
    @InjectRepository(OrderEntity) repository: Repository<OrderEntity>
  ) {
    super(repository);
  }
}

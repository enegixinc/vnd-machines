import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentsEntity } from './payments.entity';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
@Injectable()
export class PaymentsService extends TypeOrmCrudService<PaymentsEntity> {
  constructor(
    @InjectRepository(PaymentsEntity)
    private readonly repository: Repository<PaymentsEntity>
  ) {
    super(repository);
  }
}

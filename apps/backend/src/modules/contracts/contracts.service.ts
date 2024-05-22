import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { ContractEntity } from './entities/contract.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ContractsService extends TypeOrmCrudService<ContractEntity> {
  constructor(
    @InjectRepository(ContractEntity)
    repository: Repository<ContractEntity>
  ) {
    super(repository);
  }
}

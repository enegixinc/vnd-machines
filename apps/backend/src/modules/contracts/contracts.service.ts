import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { ContractEntity } from './entities/contract.entity';

@Injectable()
export class ContractsService extends TypeOrmCrudService<ContractEntity> {}

import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { MachineEntity } from './entities/machine.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MachinesService extends TypeOrmCrudService<MachineEntity> {
  constructor(@InjectRepository(MachineEntity) repository: Repository<MachineEntity>) {
    super(repository);
  }
}

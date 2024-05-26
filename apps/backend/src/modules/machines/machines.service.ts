import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { MachineEntity } from './machine.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MachinesService extends TypeOrmCrudService<MachineEntity> {
  constructor(
    @InjectRepository(MachineEntity)
    private readonly machineRepository: Repository<MachineEntity>
  ) {
    super(machineRepository);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { FillRequestEntity } from './fill-request.entity';

@Injectable()
export class RequestsService extends TypeOrmCrudService<FillRequestEntity> {
  constructor(
    @InjectRepository(FillRequestEntity)
    private readonly repository: Repository<FillRequestEntity>
  ) {
    super(repository);
  }
}

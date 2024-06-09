import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { RequestEntity } from './request.entity';

@Injectable()
export class RequestsService extends TypeOrmCrudService<RequestEntity> {
  constructor(
    @InjectRepository(RequestEntity) repository: Repository<RequestEntity>
  ) {
    super(repository);
  }
}

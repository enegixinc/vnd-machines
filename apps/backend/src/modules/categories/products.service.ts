import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { CategoryEntity } from './category.entity';

@Injectable()
export class ProductsService extends TypeOrmCrudService<CategoryEntity> {
  constructor(
    @InjectRepository(CategoryEntity) repository: Repository<CategoryEntity>
  ) {
    super(repository);
  }
}

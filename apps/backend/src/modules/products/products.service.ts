import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductsService extends TypeOrmCrudService<ProductEntity> {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>
  ) {
    super(repository);
  }
}

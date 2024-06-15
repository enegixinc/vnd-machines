import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';

@Injectable()
export class ProductsService extends TypeOrmCrudService<ProductEntity> {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>
  ) {
    super(repository);
  }

  async search(query: string) {
    return this.repository
      .createQueryBuilder('entity')
      .where(
        `jsonb_path_exists(entity.name, '$.** ? (@.type() == "string" && @ like_regex "${query}" flag "i")')`
      )
      .orWhere(
        `jsonb_path_exists(entity.description, '$.** ? (@.type() == "string" && @ like_regex "${query}" flag "i")')`
      )
      .getMany();
  }
}

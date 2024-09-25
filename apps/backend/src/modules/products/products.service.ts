import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  FindOperator,
  IsNull,
  LessThan,
  Not,
  Repository,
} from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { ProductsMin } from '../machines/entities/products_min.entity';
import { MachineProduct } from '../machines/entities/machine-product.entity';

@Injectable()
export class ProductsService extends TypeOrmCrudService<ProductEntity> {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly repository: Repository<ProductEntity>,
    @InjectRepository(ProductsMin)
    private readonly productsMinRepository: Repository<ProductsMin>,
    @InjectRepository(MachineProduct)
    private readonly machineProductRepository: Repository<MachineProduct>
  ) {
    super(repository);
  }

  async search(query: string) {
    return this.repository
      .createQueryBuilder('entity')
      .where(
        `jsonb_path_exists(entity.searchableText, '$.** ? (@.type() == "string" && @ like_regex "${query}" flag "i")')`
      )
      .getMany();
  }
  async findProductsByExpirationDate(
    expirationDateCondition: FindOperator<Date>
  ) {
    return await this.machineProductRepository.find({
      where: {
        expiration_date: expirationDateCondition,
        machine: Not(IsNull()),
      },
      relations: ['product', 'machine', 'product.supplier'],
    });
  }

  async findProductsWillExpireBetween(from: Date, to: Date) {
    return this.findProductsByExpirationDate(Between(from, to));
  }

  async findExpiredProducts() {
    const today = new Date();
    return this.findProductsByExpirationDate(LessThan(today));
  }

  async findLowStockProductsForSupplier(supplierId: string) {
    return this.productsMinRepository.find({
      where: {},
    });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOperator, LessThan, Repository } from 'typeorm';
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
  findProductsByExpirationDate(expirationDateCondition: FindOperator<Date>) {
    return this.machineProductRepository.find({
      where: {
        expiration_date: expirationDateCondition,
      },
      relations: ['product', 'machine', 'product.supplier'],
    });
  }

  findProductsWillExpireBetween(from: Date, to: Date) {
    return this.findProductsByExpirationDate(Between(from, to));
  }

  findExpiredProducts() {
    const today = new Date();
    return this.findProductsByExpirationDate(LessThan(today));
  }

  async findLowStockProducts() {
    const productIdsRaw = await this.machineProductRepository.query(`
      SELECT
        product_id
      FROM
        machine_product
          join products_min on machine_product.product_id = products_min.id

      WHERE
        machine_product.current_stock <= products_min.min
    `);
    const productIds = productIdsRaw.map((product) => product.product_id);

    // return await this.machineProductRepository.find({
    //   where: {
    //     _id: In(productIds.map((product) => product.product_id)),
    //   },
    //   relations: ['product', 'machine', 'product.supplier'],
    // });

    const products = productIds.map(async (productId) => {
      return this.machineProductRepository.findOne({
        where: {
          id: productId,
        },
        relations: ['product', 'machine', 'product.supplier'],
      });
    });

    return await Promise.all(products);
  }
}

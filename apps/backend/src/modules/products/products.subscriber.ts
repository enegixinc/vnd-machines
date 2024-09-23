import {
  DataSource,
  EventSubscriber,
  RemoveEvent,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { Inject } from '@nestjs/common';
import { EntitySyncer } from '../../common/entities/entity-syncer/entity-syncer';
import { ISerializedMagexProduct, UserRole } from '@core';
import { CategoryEntity } from '../categories/category.entity';
import { BrandEntity } from '../brands/brand.entity';
import { MagexService } from '../../services/magex/magex.service';
import { ProductEntity, ProductStatus } from './entities/product.entity';
import { MultiLangEntity } from './entities/multiLang.entity';
import { FillRequestProducts } from '../requests/fill-requests/fill-request.entity';
import { UserEntity } from '../users/entities/user.entity';

@EventSubscriber()
export class ProductSubscriber extends EntitySyncer<ProductEntity> {
  constructor(
    @Inject(DataSource) protected dataSource: DataSource,
    @Inject(MagexService) protected magexService: MagexService
  ) {
    super(dataSource, magexService);
  }

  listenTo() {
    return ProductEntity;
  }
  async beforeInsert(event: InsertEvent<ProductEntity>): Promise<void> {
    console.log('product subscriber');

    const userId = event.entity.createdBy;
    const userRepo = this.dataSource.manager.getRepository(UserEntity);
    const user = await userRepo.findOne({
      where: { _id: userId },
    });
    if (user.role == UserRole.SUPPLIER) {
      event.entity.status = ProductStatus.PENDING;
    }
  }

  async beforeUpdate(event: UpdateEvent<ProductEntity>): Promise<void> {
    const updatedColumns = event.updatedColumns;

    // Check if only one column is updated and if it's the 'status' column
    if (
      updatedColumns.length === 1 &&
      updatedColumns[0].propertyName === 'status'
    ) {
      // Perform your action here
      const productId = event.entity._id;
      const productRepo = this.dataSource.manager.getRepository(ProductEntity);
      const product = await productRepo.findOne({ where: { _id: productId } });
      //create data with magex
    }
    return;
  }

  handleSearchableFields(record: ISerializedMagexProduct) {
    return {
      fullName: MultiLangEntity.handleMultiLang(record.name),
      searchableText: MultiLangEntity.handleSearchableText([
        record._id,
        record.name,
        record.description,
        record.ingredients,
        record.detail,
        record.include,
        record.keyFeatures,
        record.barcode,
        record.upc,
      ]),
    };
  }

  private async handleBeforeDelete(event: RemoveEvent<ProductEntity>) {
    const fillRequestProductsRepository =
      this.dataSource.manager.getRepository(FillRequestProducts);

    const productFillRequests = await fillRequestProductsRepository.find({
      where: {
        product_id: event.entity._id,
      },
    });

    for (const frp of productFillRequests) {
      frp.deletedProduct = event.entity;
      await fillRequestProductsRepository.save(frp);
    }
  }

  private async handleBeforeInsert(event: InsertEvent<ProductEntity>) {}

  async beforeRemove(event: RemoveEvent<ProductEntity>): Promise<void> {
    await this.handleBeforeDelete(event);
  }

  async beforeSoftRemove(event: RemoveEvent<ProductEntity>): Promise<void> {
    await this.handleBeforeDelete(event);
  }

  handleRelationships(record: ISerializedMagexProduct) {
    let category: CategoryEntity | undefined;
    let brand: BrandEntity | undefined;

    if (record.category.length) {
      category = this.dataSource.manager.create(CategoryEntity);
      Object.assign(category, record.category[0]);
    }

    if (record.brand) {
      brand = this.dataSource.manager.create(BrandEntity);
      Object.assign(brand, record.brand);
    }

    console.log('category', category);
    console.log('brand', brand);

    return this.dataSource.manager.create(ProductEntity, {
      ...record,
      category,
      brand,
    });
  }
}

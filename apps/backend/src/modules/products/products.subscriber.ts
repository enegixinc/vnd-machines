import { DataSource, EventSubscriber } from 'typeorm';
import { Inject } from '@nestjs/common';
import { EntitySyncer } from '../../common/entities/entity-syncer/entity-syncer';
import { ProductEntity } from './product.entity';
import { ISerializedMagexProduct } from '@core';
import { CategoryEntity } from '../categories/category.entity';
import { BrandEntity } from '../brands/brand.entity';
import { MagexService } from '../../services/magex/magex.service';

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

    return this.dataSource.manager.create(ProductEntity, {
      ...record,
      category,
      brand,
    });
  }
}

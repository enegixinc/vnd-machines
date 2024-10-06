import { DataSource, EventSubscriber, RemoveEvent } from 'typeorm';
import { Inject } from '@nestjs/common';
import { EntitySyncer } from '../../common/entities/entity-syncer/entity-syncer';
import { ISerializedMagexProduct } from '@core';
import { CategoryEntity } from '../categories/category.entity';
import { BrandEntity } from '../brands/brand.entity';
import { MagexService } from '../../services/magex/magex.service';
import { ProductEntity, ProductStatus } from './entities/product.entity';
import { MultiLangEntity } from './entities/multiLang.entity';
import { FillRequestProducts } from '../requests/fill-requests/fill-request.entity';

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

  override async fetchOurRecords() {
    const products = await super.fetchOurRecords();
    return products.filter(
      (product) => product.status === ProductStatus.ACTIVE
    );
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

  async beforeSoftRemove(event: RemoveEvent<ProductEntity>): Promise<void> {
    await this.handleBeforeDelete(event);
    await super.beforeSoftRemove(event);
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

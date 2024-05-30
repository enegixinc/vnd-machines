import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  ObjectLiteral,
  RecoverEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { MagexService } from '../../services/magex/magex.service';
import { Inject } from '@nestjs/common';
import { EntitySyncer } from '../../common/entities/entity-syncer/entitySyncer';
import { ProductEntity } from './product.entity';
import { ISerializedMagexProduct } from '@core';
import { CategoryEntity } from '../categories/category.entity';
import { BrandEntity } from '../brands/brand.entity';

@EventSubscriber()
export class ProductSubscriber
  extends EntitySyncer<ProductEntity>
  implements EntitySubscriberInterface<ProductEntity>
{
  constructor(
    @Inject(MagexService) private readonly magexService: MagexService,
    @Inject(DataSource) protected dataSource: DataSource
  ) {
    super(dataSource);
    this.dataSource.subscribers.push(this);
  }

  listenTo() {
    return ProductEntity;
  }

  async beforeInsert(event: InsertEvent<ProductEntity>) {
    if (event.entity.lastSyncAt) return;

    const formData = await this.handleMultiLangProps(event.entity);
    const { newProduct } = await this.magexService.products.postProductsCreate({
      formData,
    });

    Object.assign(event.entity, newProduct);
    // @ts-expect-error - TODO: add type

    event.entity.lastSyncAt = newProduct.updatedAt;
  }

  async beforeSoftRemove(event: RemoveEvent<ProductEntity>) {
    const product = event.entity;
    await this.magexService.products.deleteProductsDeleteById({
      id: product._id,
    });
  }

  async beforeUpdate(event: UpdateEvent<ProductEntity>) {
    const formData = await this.handleMultiLangProps(event.entity);

    await this.magexService.products.putProductsEditById({
      id: formData._id,
      formData,
    });
  }

  async handleMultiLangProps(product: ObjectLiteral) {
    const multiLangProps = [
      'name',
      'description',
      'ingredients',
      'detail',
      'include',
      'keyFeatures',
      'specification',
    ];
    return Object.fromEntries(
      Object.entries(product).map(([key, value]) => {
        if (multiLangProps.includes(key)) {
          return [key, JSON.stringify(value)];
        }
        return [key, value];
      })
    );
  }

  async beforeRecover(event: RecoverEvent<ProductEntity>) {
    const formData = await this.handleMultiLangProps(event.entity);
    const { newProduct } = await this.magexService.products.postProductsCreate({
      formData,
    });

    Object.assign(event.entity, newProduct);
    // @ts-expect-error - to be fixed
    event.entity.lastSyncAt = newProduct.updatedAt;
  }

  async fetchMagexRecords() {
    // @ts-expect-error - TODO: add type
    this.magexRecords =
      await this.magexService.products.getProductsByAccountName({
        accountName: 'tryvnd@point24h.com',
      });
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

import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
} from 'typeorm';
import { MagexService } from '../../services/magex/magex.service';
import { Inject } from '@nestjs/common';
import { EntitySyncer } from '../brands/entitySyncer';
import { ProductEntity } from './product.entity';
import { ISerializedMagexProduct } from '@core';
import { CategoryEntity } from '../categories/category.entity';

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

  // async beforeInsert(event: InsertEvent<BrandEntity>) {
  //   if (event.entity.lastSyncAt) return;
  //
  //   const { newBrand } = await this.magexService.brands.postBrandsCreate({
  //     formData: {
  //       name: JSON.stringify(event.entity.name),
  //       referTo: event.entity.referTo,
  //       // picture: event.entity.picture,
  //     },
  //   });
  //
  //   Object.assign(event.entity, newBrand);
  //   event.entity.lastSyncAt = newBrand.updatedAt;
  // }

  async fetchMagexRecords() {
    this.magexRecords =
      await this.magexService.products.getProductsByAccountName({
        accountName: 'tryvnd@point24h.com',
      });
  }

  handleRelationships(record: ISerializedMagexProduct) {
    const category = this.dataSource.manager.create(CategoryEntity);
    Object.assign(category, record.category[0]);

    return this.dataSource.manager.create(ProductEntity, {
      ...record,
      category,
    });
  }
}

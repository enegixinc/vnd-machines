import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
} from 'typeorm';
import { MagexService } from '../../services/magex/magex.service';
import { Inject } from '@nestjs/common';
import { EntitySyncer } from '../../common/entities/entity-syncer/entity-syncer';
import { OrderEntity } from './orders.entity';
import { ProductEntity } from '../products/product.entity';

@EventSubscriber()
export class OrdersSubscriber
  extends EntitySyncer<OrderEntity>
  implements EntitySubscriberInterface<OrderEntity>
{
  constructor(
    @Inject(MagexService) protected readonly magexService: MagexService,
    @Inject(DataSource) protected dataSource: DataSource
  ) {
    super(dataSource, magexService);
    this.dependsOn = [ProductEntity];
  }

  listenTo() {
    return OrderEntity;
  }

  async preloadProducts(productIds: string[]) {
    const promises = productIds.map(async (_id) => {
      const product = await this.dataSource.manager.findOne(ProductEntity, {
        withDeleted: true,
        where: { _id },
      });
      console.log({
        _id,
        count: await this.dataSource.manager.count(ProductEntity),
        product,
      });
      return product;
    });
    console.log({ productIds });
    return Promise.all(promises);
  }

  async handleRelationships(record: any) {
    const productIds = record.products.map((p) => {
      if (p.product) {
        return p.product._id;
      }
    });
    const products = await this.preloadProducts(productIds);
    return this.dataSource.manager.create(OrderEntity, {
      ...record,
      products,
    });
  }
}

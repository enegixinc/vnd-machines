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
import { OrderProduct } from './order-product.entity';

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
      return await this.dataSource.manager.findOne(ProductEntity, {
        withDeleted: true,
        where: { _id },
        relations: ['brand', 'category', 'supplier'],
      });
    });
    return Promise.all(promises);
  }

  async handleRelationships(record: any): Promise<OrderEntity> {
    const productIds = record.products.map((p) => {
      if (p.product) {
        return p.product._id;
      }
    });

    const products = await this.preloadProducts(productIds);

    const order = this.dataSource.manager.create(OrderEntity, {
      ...record,
    });

    order.products = record.products.map((productData, index) => {
      const product = products.find((p) => p._id === productData?.product?._id);
      const orderProduct = this.dataSource.manager.create(OrderProduct);

      Object.assign(orderProduct, {
        ...productData,
        product,
        order,
        supplier: product?.supplier,
        brand: product?.brand,
        category: product?.category,
      });

      return orderProduct;
    });

    return order;
  }
}

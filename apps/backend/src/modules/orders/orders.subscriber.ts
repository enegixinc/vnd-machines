import { DataSource, EntitySubscriberInterface, EventSubscriber } from 'typeorm';
import { MagexService } from '../../services/magex/magex.service';
import { Inject } from '@nestjs/common';
import { EntitySyncer } from '../../common/entities/entity-syncer/entity-syncer';
import { OrderEntity } from './orders.entity';
import { ProductEntity } from '../products/product.entity';
import { OrderProductsDetails } from './order-details.entity';

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

    const allProducts = await this.preloadProducts(productIds);

    const order = this.dataSource.manager.create(OrderEntity);

    const productsDetails = record.products.map((soldProductData, index) => {
      const product = allProducts.find(
        (p) => p?._id === soldProductData?.product?._id
      );
      const orderProduct = this.dataSource.manager.create(
        OrderProductsDetails,
        soldProductData
      );
      orderProduct.product = product;

      return orderProduct;
    });

    Object.assign(order, record);
    order.products = productsDetails;
    return order;
  }
}

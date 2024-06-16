import { DataSource, EventSubscriber } from 'typeorm';
import { MagexService } from '../../services/magex/magex.service';
import { Inject } from '@nestjs/common';
import { EntitySyncer } from '../../common/entities/entity-syncer/entity-syncer';
import { OrderEntity } from './order.entity';
import { ProductEntity } from '../products/entities/product.entity';
import { OrderProductsDetails } from './order-details.entity';
import { MachineEntity } from '../machines/entities/machine.entity';

@EventSubscriber()
export class OrdersSubscriber extends EntitySyncer<OrderEntity> {
  constructor(
    @Inject(MagexService) protected readonly magexService: MagexService,
    @Inject(DataSource) protected dataSource: DataSource
  ) {
    super(dataSource, magexService);
    this.dependsOn = [ProductEntity];
    this.syncConfig = {
      added: true,
      updated: true,
      deleted: true,
    };
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

  async preloadMachine(machineId: string) {
    return await this.dataSource.manager.findOne(MachineEntity, {
      withDeleted: true,
      where: { _id: machineId },
    });
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
    order.machine = await this.preloadMachine(record?.machineID?._id);
    console.log('machine', order.machine);
    return order;
  }
}

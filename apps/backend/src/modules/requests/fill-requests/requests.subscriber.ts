import { DataSource, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { FillRequestEntity, FillRequestProducts } from './fill-request.entity';
import { Inject } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { QUEUES } from '../../../common/constants';
import { Queue } from 'bullmq';

export class RequestsSubscriber
  implements EntitySubscriberInterface<FillRequestEntity>
{
  constructor(
    @Inject(DataSource) private readonly dataSource: DataSource,
    @InjectQueue(QUEUES.REQUESTS) private readonly requestsQueue: Queue
  ) {
    this.dataSource.subscribers.push(this);
  }

  listenTo() {
    return FillRequestEntity;
  }

  async afterInsert(event: InsertEvent<FillRequestEntity>) {
    const resolvedFillRequest: FillRequestEntity = event.entity;

    await this.requestsQueue.add('fill-request', resolvedFillRequest, {
      attempts: 3,
    });
  }
}

export class FillRequestProductsSubscriber
  implements EntitySubscriberInterface<FillRequestProducts>
{
  constructor(@Inject(DataSource) private readonly dataSource: DataSource) {
    this.dataSource.subscribers.push(this);
  }

  listenTo() {
    return FillRequestProducts;
  }

  async beforeInsert(event: InsertEvent<FillRequestProducts>) {
    const result = await this.dataSource
      .createQueryBuilder()
      .select('supplier._id')
      .from('users', 'supplier')
      .innerJoin('products', 'product', 'product.supplier_id = supplier._id')
      .where('product._id = :productId', {
        productId: event.entity.product._id,
      })
      .getOne();

    event.entity.supplier_id = result._id;
  }
}

import { DataSource, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { FillRequestEntity } from './fill-request.entity';
import { Inject } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { QUEUES } from '../../../common/constants';
import { Queue } from 'bullmq';
import { ProductEntity } from '../../products/entities/product.entity';
import { MachineEntity } from '../../machines/entities/machine.entity';

export class RequestsSubscriber implements EntitySubscriberInterface {
  constructor(
    @Inject(DataSource) private dataSource: DataSource,
    @InjectQueue(QUEUES.REQUESTS) private requestsQueue: Queue
  ) {
    this.dataSource.subscribers.push(this);
  }

  listenTo() {
    return FillRequestEntity;
  }

  async afterInsert(event: InsertEvent<FillRequestEntity>) {
    try {
      const resolvedFillRequest: FillRequestEntity = event.entity;

      console.log('Processing fill request', resolvedFillRequest);
      const machine = await this.dataSource.manager.findOne(MachineEntity, {
        where: { _id: event.entity.machine._id },
      });
      Object.assign(resolvedFillRequest, { machine });

      const products = await Promise.all(
        event.entity.products.map(async (product) => {
          const resolvedProduct = await this.dataSource.manager.findOne(
            ProductEntity,
            {
              where: { _id: product._id },
              relations: ['supplier'],
            }
          );
          return { product: resolvedProduct, quantity: product.quantity };
        })
      );
      Object.assign(resolvedFillRequest, { products });

      await this.requestsQueue.add('process', resolvedFillRequest, {
        attempts: 3,
      });
    } catch (error) {
      console.error('Error processing fill request', error);
    }
  }
}

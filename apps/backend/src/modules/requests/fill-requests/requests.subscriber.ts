import { DataSource, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { FillRequestEntity } from './fill-request.entity';
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

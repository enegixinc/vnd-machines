import { DataSource, EntitySubscriberInterface, InsertEvent } from 'typeorm';
import { FillRequestEntity } from './fill-request.entity';
import { Inject } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { QUEUES } from '../../../common/constants';
import { Queue } from 'bullmq';

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
    await this.requestsQueue.add('requests', {
      requestId: event.entity._id,
    });
  }
}

import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { MagexService } from '../../services/magex/magex.service';
import { Inject } from '@nestjs/common';

@EventSubscriber()
export abstract class EntitySubscriber<Entity>
  implements EntitySubscriberInterface<Entity>
{
  protected constructor(
    private readonly magexService: MagexService,
    @Inject(DataSource) dataSource: DataSource
  ) {
    dataSource.subscribers.push(this);
  }

  abstract listenTo(): string;

  beforeInsert(event: InsertEvent<Entity>) {
    console.log('beforeInsert');
  }
}

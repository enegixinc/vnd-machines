import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
} from 'typeorm';
import { MagexService } from '../../services/magex/magex.service';
import { Inject } from '@nestjs/common';
import { EntitySyncer } from '../../common/entities/entity-syncer/entity-syncer';
import { OrderEntity } from './orders.entity';

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
  }

  listenTo() {
    return OrderEntity;
  }
}

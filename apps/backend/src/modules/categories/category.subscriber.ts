import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
} from 'typeorm';
import { Inject } from '@nestjs/common';
import { CategoryEntity } from './category.entity';
import { EntitySyncer } from '../../common/entities/entity-syncer/entitySyncer';
import { MagexService } from '../../services/magex/magex.service';

@EventSubscriber()
export class CategorySubscriber
  extends EntitySyncer<CategoryEntity>
  implements EntitySubscriberInterface<CategoryEntity>
{
  constructor(
    @Inject(DataSource) protected dataSource: DataSource,
    @Inject(MagexService) protected magexService: MagexService
  ) {
    super(dataSource, magexService);
    this.dataSource.subscribers.push(this);
  }

  listenTo() {
    return CategoryEntity;
  }
}

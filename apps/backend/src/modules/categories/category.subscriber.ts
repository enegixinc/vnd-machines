import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
} from 'typeorm';
import { Inject } from '@nestjs/common';
import { CategoryEntity } from './category.entity';
import { EntitySyncer } from '../../common/entities/entity-syncer/entity-syncer';
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
  }

  listenTo() {
    return CategoryEntity;
  }
}

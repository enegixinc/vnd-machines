import { DataSource, EventSubscriber } from 'typeorm';
import { Inject } from '@nestjs/common';
import { CategoryEntity } from './category.entity';
import { EntitySyncer } from '../../common/entities/entity-syncer/entity-syncer';
import { MagexService } from '../../services/magex/magex.service';
import { ISerializedMagexProduct } from '@core';
import { MultiLangEntity } from '../products/entities/multiLang.entity';

@EventSubscriber()
export class CategorySubscriber extends EntitySyncer<CategoryEntity> {
  constructor(
    @Inject(DataSource) protected dataSource: DataSource,
    @Inject(MagexService) protected magexService: MagexService
  ) {
    super(dataSource, magexService);
  }

  listenTo() {
    return CategoryEntity;
  }

  handleSearchableFields(record: CategoryEntity) {
    return {
      fullName: MultiLangEntity.handleMultiLang(record.name),
      searchableText: MultiLangEntity.handleSearchableText([
        record.name,
        record._id,
      ]),
    };
  }
}

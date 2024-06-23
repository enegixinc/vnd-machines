import { DataSource, EventSubscriber } from 'typeorm';
import { BrandEntity } from './brand.entity';
import { Inject } from '@nestjs/common';
import { EntitySyncer } from '../../common/entities/entity-syncer/entity-syncer';
import { MagexService } from '../../services/magex/magex.service';
import { _IMagex_DatabaseEntity } from '@core';
import { MultiLangEntity } from '../products/entities/multiLang.entity';

@EventSubscriber()
export class BrandSubscriber extends EntitySyncer<BrandEntity> {
  constructor(
    @Inject(DataSource) protected dataSource: DataSource,
    @Inject(MagexService) protected magexService: MagexService
  ) {
    super(dataSource, magexService);
  }

  listenTo() {
    return BrandEntity;
  }

  handleSearchableFields(record: BrandEntity): {
    fullName: string;
    searchableText: string;
  } {
    return {
      fullName: MultiLangEntity.handleMultiLang(record.name),
      searchableText: MultiLangEntity.handleSearchableText([
        record.name,
        record._id,
      ]),
    };
  }
}

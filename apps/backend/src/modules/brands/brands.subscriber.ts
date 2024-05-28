import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
} from 'typeorm';
import { BrandEntity } from './brand.entity';
import { MagexService } from '../../services/magex/magex.service';
import { Inject } from '@nestjs/common';
import { EntitySyncer } from '../../common/entities/entity-syncer/entitySyncer';

@EventSubscriber()
export class BrandSubscriber
  extends EntitySyncer<BrandEntity>
  implements EntitySubscriberInterface<BrandEntity>
{
  constructor(
    @Inject(MagexService) private readonly magexService: MagexService,
    @Inject(DataSource) protected dataSource: DataSource
  ) {
    super(dataSource);
    this.dataSource.subscribers.push(this);
  }

  listenTo() {
    return BrandEntity;
  }

  // async beforeInsert(event: InsertEvent<BrandEntity>) {
  //   if (event.entity.lastSyncAt) return;
  //
  //   const { newBrand } = await this.magexService.brands.postBrandsCreate({
  //     formData: {
  //       name: JSON.stringify(event.entity.name),
  //       referTo: event.entity.referTo,
  //       // picture: event.entity.picture,
  //     },
  //   });
  //
  //   Object.assign(event.entity, newBrand);
  //   event.entity.lastSyncAt = newBrand.updatedAt;
  // }

  async fetchMagexRecords() {
    this.magexRecords = await this.magexService.brands.getBrandsByAccountName({
      accountName: 'tryvnd@point24h.com',
    });
  }
}

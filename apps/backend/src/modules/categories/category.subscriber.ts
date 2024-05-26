import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
} from 'typeorm';
import { MagexService } from '../../services/magex/magex.service';
import { Inject } from '@nestjs/common';
import { CategoryEntity } from './category.entity';
import { EntitySyncer } from '../brands/entitySyncer';

@EventSubscriber()
export class CategorySubscriber
  extends EntitySyncer<CategoryEntity>
  implements EntitySubscriberInterface<CategoryEntity>
{
  constructor(
    @Inject(MagexService) private readonly magexService: MagexService,
    @Inject(DataSource) protected dataSource: DataSource
  ) {
    super(dataSource);
    this.dataSource.subscribers.push(this);
  }

  listenTo() {
    return CategoryEntity;
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
    this.magexRecords =
      await this.magexService.categories.getCategoriesByAccountName({
        accountName: 'tryvnd@point24h.com',
      });
  }
}

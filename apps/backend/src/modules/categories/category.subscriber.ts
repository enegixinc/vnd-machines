import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RecoverEvent,
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
  // async beforeInsert(event: InsertEvent<CategoryEntity>) {
  //   if (event.entity.lastSyncAt) return;
  //   await this.createCategory(event);
  // }

  // async beforeSoftRemove(event: RemoveEvent<CategoryEntity>) {
  //   const category = event.entity;
  //   await this.magexService.categories.deleteCategoriesDeleteById({
  //     id: category._id,
  //   });
  // }
  //
  // async beforeUpdate(event: UpdateEvent<CategoryEntity>) {
  //   const category = event.entity;
  //
  //   await this.magexService.categories.putCategoriesEditById({
  //     id: category._id,
  //     formData: {
  //       name: JSON.stringify(category.name),
  //       referTo: category.referTo,
  //       auto: category.auto ? 'true' : 'false',
  //       sortIndex: category.sortIndex,
  //     },
  //   });
  // }
  //
  // async beforeRecover(event: RecoverEvent<CategoryEntity>) {
  //   await this.dataSource.manager.remove(event.entity, {
  //     listeners: false,
  //   });
  //
  //   await this.createCategory(event);
  // }

  listenTo() {
    return CategoryEntity;
  }

  async createCategory(
    event: InsertEvent<CategoryEntity> | RecoverEvent<CategoryEntity>
  ) {
    // @ts-expect-error - to be fixed
    const { newCategory } =
      await this.magexService.categories.postCategoriesCreate({
        formData: {
          name: JSON.stringify(event.entity.name),
          referTo: event.entity.referTo,
          auto: event.entity.auto,
          sortIndex: event.entity.sortIndex,
          categoryPicture: event.entity.categoryPicture,
        },
      });
    Object.assign(event.entity, newCategory);
    event.entity.lastSyncAt = newCategory.updatedAt;
  }
  async fetchMagexRecords() {
    // this.magexRecords =
    //   await this.magexService.categories.getCategoriesByAccountName({
    //     accountName: 'tryvnd@point24h.com',
    //   });
  }
}

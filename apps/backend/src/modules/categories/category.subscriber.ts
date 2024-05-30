import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { MagexService } from '../../services/magex/magex.service';
import { Inject } from '@nestjs/common';
import { CategoryEntity } from './category.entity';
import { EntitySyncer } from '../../common/entities/entity-syncer/entitySyncer';

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

  async beforeInsert(event: InsertEvent<CategoryEntity>) {
    if (event.entity.lastSyncAt) return;

    // @ts-expect-error - TODO: add type
    const { newCategory } =
      await this.magexService.categories.postCategoriesCreate({
        formData: {
          name: JSON.stringify(event.entity.name),
          referTo: event.entity.referTo,
          auto: event.entity.auto,
          sortIndex: event.entity.sortIndex,
          // TODO: handle pics
          categoryPicture: event.entity.categoryPicture,
        },
      });
    Object.assign(event.entity, newCategory);
    event.entity.lastSyncAt = newCategory.updatedAt;
  }

  async beforeUpdate(event: UpdateEvent<CategoryEntity>) {
    const category = event.entity;
    await this.magexService.categories.putCategoriesEditById({
      id: category._id,
      formData: {
        name: JSON.stringify(category.name),
        referTo: category.referTo,
        auto: category.auto ? 'true' : 'false',
        sortIndex: category.sortIndex,
      },
    });
  }

  async fetchMagexRecords() {
    // @ts-expect-error - TODO: add type
    this.magexRecords =
      await this.magexService.categories.getCategoriesByAccountName({
        accountName: 'tryvnd@point24h.com',
      });
  }

  async beforeSoftRemove(event: RemoveEvent<CategoryEntity>) {
    const category = event.entity;
    await this.magexService.categories.deleteCategoriesDeleteById({
      id: category._id,
    });
  }
}

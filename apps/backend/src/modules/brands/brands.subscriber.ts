import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RecoverEvent,
  RemoveEvent,
  UpdateEvent,
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

  async beforeInsert(event: InsertEvent<BrandEntity>) {
    if (event.entity.lastSyncAt) return;
    await this.createBrand(event);
  }

  // insert or recover brand
  async createBrand(
    event: InsertEvent<BrandEntity> | RecoverEvent<BrandEntity>
  ) {
    const brand = event.entity;
    // @ts-expect-error - to be fixed
    const { newBrand } = await this.magexService.brands.postBrandsCreate({
      formData: {
        name: JSON.stringify(brand.name),
        referTo: brand.referTo,
      },
    });
    Object.assign(brand, newBrand);
    event.entity.lastSyncAt = newBrand.updatedAt;
  }

  async beforeSoftRemove(event: RemoveEvent<BrandEntity>) {
    const brand = event.entity;
    await this.magexService.brands.deleteBrandsDeleteById({
      id: brand._id,
    });
    await this.dataSource.manager.delete(BrandEntity, brand._id);
  }

  async beforeUpdate(event: UpdateEvent<BrandEntity>) {
    const brand = event.entity;
    await this.magexService.brands.postBrandsEditById({
      id: brand._id,
      formData: {
        name: JSON.stringify(brand.name),
        referTo: brand.referTo,
      },
    });
  }

  async beforeRecover(event) {
    await this.createBrand(event.entity);
  }

  async fetchMagexRecords() {
    // @ts-expect-error - TODO: add type
    this.magexRecords = await this.magexService.brands.getBrandsByAccountName({
      accountName: 'tryvnd@point24h.com',
    });
  }
}

import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { BrandEntity } from './brand.entity';
import { MagexService } from '../../services/magex/magex.service';
import { BrandsService } from './brands.service';
import { Inject } from '@nestjs/common';

@EventSubscriber()
export class BrandSubscriber implements EntitySubscriberInterface<BrandEntity> {
  constructor(
    private readonly magexService: MagexService,
    private readonly brandsService: BrandsService,
    @Inject(DataSource) dataSource: DataSource
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return BrandEntity;
  }

  async beforeInsert(event: InsertEvent<BrandEntity>) {
    if (event.entity.lastSyncAt) return;

    const { newBrand } = await this.magexService.brands.postBrandsCreate({
      formData: {
        name: JSON.stringify(event.entity.name),
        referTo: event.entity.referTo,
        // picture: event.entity.picture,
      },
    });

    Object.assign(event.entity, newBrand);
    event.entity.lastSyncAt = newBrand.updatedAt;
  }
}

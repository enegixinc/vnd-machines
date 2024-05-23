import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { BrandEntity } from './brand.entity';
import { magexClient } from '../../services/external-api';

@EventSubscriber()
export class BrandSubscriber implements EntitySubscriberInterface<BrandEntity> {
  constructor() {
    console.warn(`BrandSubscriber created`);
  }

  listenTo() {
    return BrandEntity;
  }

  async beforeInsert(event: InsertEvent<BrandEntity>) {
    if (event.entity.lastSyncAt) return;

    const { newBrand } = await magexClient.brands.postBrandsCreate({
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

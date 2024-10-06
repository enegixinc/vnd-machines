import { MagexDatabaseEntity } from '../../database.entity';
import {
  EntitySubscriberInterface,
  InsertEvent,
  RecoverEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { Inject } from '@nestjs/common';
import { MagexService } from '../../../services/magex/magex.service';

export class CRUDSyncer<Entity extends MagexDatabaseEntity>
  implements EntitySubscriberInterface<Entity>
{
  constructor(@Inject(MagexService) protected magexService: MagexService) {}

  protected CRUDConfig = {
    beforeInsert: true,
    beforeUpdate: true,
    beforeSoftRemove: true,
    beforeRecover: true,
  };

  async beforeInsert(event: InsertEvent<Entity>) {
    if (!this.CRUDConfig.beforeInsert) return;
    if (event.entity.lastSyncAt) return;
    await event.entity.createMagexRecord(this.magexService);
  }

  async beforeUpdate(event: UpdateEvent<Entity>) {
    if (!this.CRUDConfig.beforeUpdate) return;

    // Edge case: If event has only _id then it's related to associations and magex record should not be updated
    if (!event.entity) return;
    if (Object.keys(event.entity).length === 1 && event.entity._id) return;

    await event.entity?.updateMagexRecord(this.magexService);
  }

  async beforeSoftRemove(event: RemoveEvent<Entity>) {
    if (!this.CRUDConfig.beforeSoftRemove) return;
    await event.entity.deleteMagexRecord(this.magexService);
  }

  async beforeRecover(event: RecoverEvent<Entity>) {
    if (!this.CRUDConfig.beforeRecover) return;
    await event.entity.createMagexRecord(this.magexService);
  }
}

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
  async beforeInsert(event: InsertEvent<Entity>) {
    console.count('beforeInsert' + event.entity);
    if (event.entity.lastSyncAt) return;
    await event.entity.createMagexRecord(this.magexService);
  }

  async beforeUpdate(event: UpdateEvent<Entity>) {
    console.count('beforeUpdate');
    await event.entity.updateMagexRecord(this.magexService);
  }

  async beforeSoftRemove(event: RemoveEvent<Entity>) {
    await event.entity.deleteMagexRecord(this.magexService);
  }

  async beforeRecovered(event: RecoverEvent<Entity>) {
    await event.entity.createMagexRecord(this.magexService);
  }
}

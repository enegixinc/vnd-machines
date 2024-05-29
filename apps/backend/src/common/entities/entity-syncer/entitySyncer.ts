import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
} from 'typeorm';
import { Inject, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { timer } from 'execution-time-decorators';

export interface EntitySyncer<Entity> {
  handleRelationships(record: unknown): Entity;
}

@EventSubscriber()
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export abstract class EntitySyncer<
  Entity extends { _id: string; lastSyncAt: string },
  MagexRecord extends { _id: string; updatedAt: string } = {
    _id: string;
    updatedAt: string;
  }
> implements EntitySubscriberInterface<Entity>, OnModuleInit
{
  protected constructor(@Inject(DataSource) protected dataSource: DataSource) {}

  protected records: Entity[] = [];
  protected magexRecords: MagexRecord[] = [];
  protected get entityLookupTable() {
    return new Map(this.records.map((record) => [record._id, record]));
  }
  protected get nowDate() {
    return new Date().toISOString();
  }
  protected get Entity() {
    return this.listenTo();
  }
  private get EntityClone() {
    return this.dataSource.manager.create(this.Entity);
  }

  abstract listenTo(): any;

  async onModuleInit() {
    await this.syncWithMagex();
  }

  @timer()
  async fetchOurRecords() {
    this.records = await this.dataSource.manager.find(this.listenTo());
  }

  abstract fetchMagexRecords(): Promise<void>;
  @timer()
  private timedFetchMagexRecords() {
    return this.fetchMagexRecords();
  }

  @timer()
  identifyOutOfSyncRecords() {
    const newRecords = new Set<MagexRecord>();
    const updatedRecords = new Set<MagexRecord>();

    this.magexRecords.filter((magexRecord) => {
      const record = this.entityLookupTable.get(magexRecord._id);
      const gotUpdated =
        record && new Date(record.lastSyncAt) < new Date(magexRecord.updatedAt);

      if (!record) newRecords.add(magexRecord);
      else if (gotUpdated) updatedRecords.add(magexRecord);
    });

    console.log('new records:', newRecords.size);
    console.log('updated records:', updatedRecords.size);

    return {
      newRecords: [...newRecords],
      updatedRecords: [...updatedRecords],
    };
  }

  @timer()
  prepareRecords(records: unknown[]) {
    return records.map((record) => {
      const entity = this.EntityClone;
      Object.assign(entity, this.assignRelations(record));
      Object.assign(entity, { lastSyncAt: this.nowDate });
      return entity;
    });
  }
  assignRelations(record: unknown) {
    return this.handleRelationships ? this.handleRelationships(record) : record;
  }

  @timer()
  async saveRecords(records: unknown[]) {
    await this.dataSource.manager.save(records, {
      listeners: false,
      chunk: 1000,
    });
  }

  @Cron(CronExpression.EVERY_MINUTE)
  @timer()
  async syncWithMagex() {
    console.log('Syncing with Magex', this.Entity.name);
    await Promise.all([this.fetchOurRecords(), this.timedFetchMagexRecords()]);

    const { newRecords, updatedRecords } = this.identifyOutOfSyncRecords();
    const records = this.prepareRecords([...newRecords, ...updatedRecords]);

    await this.saveRecords(records);
  }
}

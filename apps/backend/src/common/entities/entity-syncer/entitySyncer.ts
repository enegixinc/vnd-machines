import {
  DataSource,
  EntitySubscriberInterface,
  InsertEvent,
  RecoverEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { Inject, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { timer } from 'execution-time-decorators';
import * as process from 'node:process';
import { MagexDatabaseEntity } from '../../database.entity';
import { MagexService } from '../../../services/magex/magex.service';

export interface EntitySyncer<Entity> {
  handleRelationships(record: unknown): Entity;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export abstract class EntitySyncer<
  Entity extends MagexDatabaseEntity,
  MagexRecord extends { _id: string; updatedAt: string } = {
    _id: string;
    updatedAt: string;
  }
> implements EntitySubscriberInterface<Entity>, OnModuleInit
{
  protected constructor(
    @Inject(DataSource) protected dataSource: DataSource,
    @Inject(MagexService) protected magexService: MagexService
  ) {
    this.dataSource.subscribers.push(this);
  }
  private get Entity() {
    return this.listenTo();
  }
  protected records: Entity[] = [];
  protected magexRecords: MagexRecord[] = [];
  protected get entityLookupTable() {
    return new Map(this.records.map((record) => [record._id, record]));
  }
  protected get nowDate() {
    return new Date().toISOString();
  }
  private get EntityClone() {
    return this.dataSource.manager.create(this.Entity);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  abstract listenTo(): string | Function;

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

  @Cron(
    process.env.NODE_ENV === 'production'
      ? CronExpression.EVERY_SECOND
      : CronExpression.EVERY_5_MINUTES
  )
  @timer()
  async syncWithMagex() {
    console.log('Syncing with Magex', this.Entity);
    await Promise.all([this.fetchOurRecords(), this.timedFetchMagexRecords()]);

    const { newRecords, updatedRecords } = this.identifyOutOfSyncRecords();
    const records = this.prepareRecords([...newRecords, ...updatedRecords]);

    await this.saveRecords(records);

    // clear all records even soft deleted ones
    // await this.dataSource.manager.delete(this.listenTo(), {});
  }

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

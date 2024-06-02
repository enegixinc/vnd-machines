import { DataSource, EntitySubscriberInterface } from 'typeorm';
import { Inject, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { timer } from 'execution-time-decorators';
import * as process from 'node:process';
import { MagexDatabaseEntity } from '../../database.entity';
import { MagexService } from '../../../services/magex/magex.service';
import { CRUDSyncer } from './crud-syncer';
import { _IMagex_DatabaseEntity } from '@core';

export interface EntitySyncer<Entity> {
  handleRelationships(record: unknown): Entity;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export abstract class EntitySyncer<
    Entity extends MagexDatabaseEntity,
    MagexRecord extends _IMagex_DatabaseEntity = _IMagex_DatabaseEntity
  >
  extends CRUDSyncer<Entity>
  implements EntitySubscriberInterface<Entity>, OnModuleInit
{
  protected constructor(
    @Inject(DataSource) protected dataSource: DataSource,
    @Inject(MagexService) protected magexService: MagexService
  ) {
    super(magexService);
    this.dataSource.subscribers.push(this);
  }
  // eslint-disable-next-line @typescript-eslint/ban-types
  private get Entity(): string | Function {
    return this.listenTo();
  }
  private records: Entity[] = [];
  protected magexRecords: MagexRecord[] = [];
  protected get entityLookupTable() {
    return new Map(this.records.map((record) => [record._id, record]));
  }
  private get EntityClone(): MagexDatabaseEntity {
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
  async fetchMagexRecords() {
    console.log('fetching magex records', this.EntityClone);
    // @ts-expect-error - TODO: fix this
    this.magexRecords = await this.EntityClone.fetchMagexRecords(
      this.magexService
    );
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
  private prepareRecords(records: unknown[]) {
    return records.map((record) => {
      const entity = this.EntityClone;
      Object.assign(entity, this.assignRelations(record));
      Object.assign(entity, { lastSyncAt: new Date().toISOString() });
      return entity;
    });
  }
  private assignRelations(record: unknown) {
    return this.handleRelationships ? this.handleRelationships(record) : record;
  }

  @timer()
  private async saveRecords(records: unknown[]) {
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
  private async syncWithMagex() {
    // @ts-expect-error - TODO: add type
    console.log('Syncing with Magex', this.Entity.name);
    await Promise.all([this.fetchOurRecords(), this.fetchMagexRecords()]);

    const { newRecords, updatedRecords } = this.identifyOutOfSyncRecords();
    const records = this.prepareRecords([...newRecords, ...updatedRecords]);

    await this.saveRecords(records);

    // clear all records even soft deleted ones
    // await this.dataSource.manager.delete(this.listenTo(), {});
  }
}

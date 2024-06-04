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
  handleRelationships(record: unknown): Entity | Promise<Entity>;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export abstract class EntitySyncer<
    Entity extends MagexDatabaseEntity,
    MagexRecord extends _IMagex_DatabaseEntity = _IMagex_DatabaseEntity
  >
  extends CRUDSyncer<Entity>
  implements EntitySubscriberInterface<Entity>, OnModuleInit
{
  protected records: Entity[] = [];
  protected magexRecords: MagexRecord[] = [];

  protected constructor(
    @Inject(DataSource) protected readonly dataSource: DataSource,
    @Inject(MagexService) protected readonly magexService: MagexService
  ) {
    super(magexService);
    this.dataSource.subscribers.push(this);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  abstract listenTo(): string | Function;

  // eslint-disable-next-line @typescript-eslint/ban-types
  private get entity(): string | Function {
    return this.listenTo();
  }

  private get entityClone(): MagexDatabaseEntity {
    return this.dataSource.manager.create(this.entity);
  }

  protected get entityLookupTable() {
    return new Map(this.records.map((record) => [record._id, record]));
  }

  async onModuleInit() {
    await this.syncWithMagex();
  }

  @timer()
  async fetchOurRecords() {
    this.records = await this.dataSource.manager.find(this.entity);
  }

  async fetchMagexRecords() {
    console.log('fetching magex records', this.entityClone);
    // @ts-expect-error - TODO: fix this
    this.magexRecords = await this.entityClone.fetchMagexRecords(
      this.magexService
    );
  }

  @timer()
  identifyOutOfSyncRecords() {
    const newRecords = new Set<MagexRecord>();
    const updatedRecords = new Set<MagexRecord>();

    this.magexRecords.forEach((magexRecord) => {
      const record = this.entityLookupTable.get(magexRecord._id);
      const gotUpdated =
        record && new Date(record.lastSyncAt) < new Date(magexRecord.updatedAt);

      if (!record) {
        newRecords.add(magexRecord);
      } else if (gotUpdated) {
        updatedRecords.add(magexRecord);
      }
    });

    console.log('new records:', newRecords.size);
    console.log('updated records:', updatedRecords.size);

    return {
      newRecords: [...newRecords],
      updatedRecords: [...updatedRecords],
    };
  }

  @timer()
  async prepareRecords(records: MagexRecord[]) {
    return Promise.all(
      records.map(async (record) => {
        const entity = this.entityClone;
        Object.assign(entity, await this.assignRelations(record));
        Object.assign(entity, { lastSyncAt: new Date().toISOString() });
        return entity;
      })
    );
  }

  private async assignRelations(record: unknown) {
    return this.handleRelationships
      ? await this.handleRelationships(record)
      : record;
  }

  @timer()
  private async saveRecords(records: MagexDatabaseEntity[]) {
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
    // @ts-expect-error - TODO: add type
    console.log('Syncing with Magex', this.entity.name);
    await Promise.all([this.fetchOurRecords(), this.fetchMagexRecords()]);

    const { newRecords, updatedRecords } = this.identifyOutOfSyncRecords();
    const preparedRecords = await this.prepareRecords([
      ...newRecords,
      ...updatedRecords,
    ]);

    await this.saveRecords(preparedRecords);

    // Uncomment this if you want to delete all records including soft deleted ones
    // await this.dataSource.manager.delete(this.entity, {});
  }
}

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
  protected syncedEntities: string[] = [];
  protected dependsOn: (string | Function)[] = [];
  private static syncStatusMap: Map<string | Function, Promise<void>> =
    new Map();

  protected constructor(
    @Inject(DataSource) protected readonly dataSource: DataSource,
    @Inject(MagexService) protected readonly magexService: MagexService
  ) {
    super(magexService);
    this.dataSource.subscribers.push(this);
  }

  protected syncConfig = {
    added: true,
    updated: true,
    deleted: true,
  };

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

  // @timer()
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

  // @timer()
  identifyOutOfSyncRecords() {
    const newRecords = new Set<MagexRecord>();
    const updatedRecords = new Set<MagexRecord>();

    this.magexRecords.forEach((magexRecord) => {
      const record = this.entityLookupTable.get(magexRecord._id);
      const newRecord = !record;
      const updated =
        record && new Date(record.lastSyncAt) < new Date(magexRecord.updatedAt);

      if (newRecord) this.syncConfig.added && newRecords.add(magexRecord);
      if (updated) this.syncConfig.updated && updatedRecords.add(magexRecord);
    });

    console.log('new records:', newRecords.size);
    console.log('updated records:', updatedRecords.size);

    return {
      newRecords: [...newRecords],
      updatedRecords: [...updatedRecords],
    };
  }

  identifyDeletedRecords() {
    if (!this.syncConfig.deleted) return [];

    const magexIds = new Set(this.magexRecords.map((record) => record._id));
    const deletedRecords = this.records.filter(
      (record) => !magexIds.has(record._id)
    );

    console.log('deleted records:', deletedRecords.length);

    return deletedRecords;
  }

  async softDeleteRecords(records: Entity[]) {
    await Promise.all(
      records.map(async (record) => {
        await this.dataSource.manager.softRemove(record, {
          listeners: false,
        });
      })
    );
  }

  // @timer()
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

  private async runDependencies() {
    for (const dependency of this.dependsOn) {
      const dependencySync = EntitySyncer.syncStatusMap.get(dependency);
      if (dependencySync) {
        await dependencySync;
      }
    }
  }

  @Cron(
    process.env.NODE_ENV === 'production'
      ? CronExpression.EVERY_SECOND
      : CronExpression.EVERY_5_MINUTES
  )
  // @timer()
  async syncWithMagex() {
    if (process.env.NODE_ENV !== 'production') return;

    const syncPromise = (async () => {
      // @ts-expect-error - TODO: fix this
      console.log('Syncing with Magex', this.entity.name);
      await this.runDependencies();
      await Promise.all([this.fetchOurRecords(), this.fetchMagexRecords()]);

      const { newRecords, updatedRecords } = this.identifyOutOfSyncRecords();
      const preparedRecords = await this.prepareRecords([
        ...newRecords,
        ...updatedRecords,
      ]);

      await this.saveRecords(preparedRecords);

      const deletedRecords = this.identifyDeletedRecords();
      await this.softDeleteRecords(deletedRecords);
    })();

    EntitySyncer.syncStatusMap.set(this.entity, syncPromise);
    await syncPromise;

    // Uncomment this if you want to delete all records including soft deleted ones
    // await this.dataSource.manager.delete(this.entity, {});
  }
}

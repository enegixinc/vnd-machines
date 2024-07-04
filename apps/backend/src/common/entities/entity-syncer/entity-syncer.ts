import { DataSource, EntitySubscriberInterface } from 'typeorm';
import { Inject, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as process from 'node:process';
import { MagexDatabaseEntity } from '../../database.entity';
import { MagexService } from '../../../services/magex/magex.service';
import { CRUDSyncer } from './crud-syncer';
import { _IMagex_DatabaseEntity } from '@core';

export interface EntitySyncer<Entity> {
  handleRelationships(record: _IMagex_DatabaseEntity): Entity | Promise<Entity>;
  handleSearchableFields(record: _IMagex_DatabaseEntity): {
    fullName: string;
    searchableText: string;
  };
}

export abstract class EntitySyncer<Entity extends MagexDatabaseEntity>
  extends CRUDSyncer<Entity>
  implements EntitySubscriberInterface<Entity>, OnModuleInit
{
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

  abstract listenTo(): string | Function;

  private get entity(): string | Function {
    return this.listenTo();
  }

  private get entityClone(): MagexDatabaseEntity {
    return this.dataSource.manager.create(this.entity);
  }

  protected entityLookupTable(records: Entity[]) {
    return new Map(records.map((record) => [record._id, record]));
  }

  async onModuleInit() {
    await this.syncWithMagex();
  }

  async fetchOurRecords() {
    return await this.dataSource.manager.find(this.entity);
  }

  async fetchMagexRecords() {
    return await this.entityClone.fetchMagexRecords(this.magexService);
  }

  identifyOutOfSyncRecords(
    ourRecords: Entity[],
    magexRecords: _IMagex_DatabaseEntity[]
  ) {
    const newRecords = new Set<_IMagex_DatabaseEntity>();
    const updatedRecords = new Set<_IMagex_DatabaseEntity>();
    const entityLookupTable = this.entityLookupTable(ourRecords);

    magexRecords.forEach((magexRecord) => {
      const record = entityLookupTable.get(magexRecord._id);
      const newRecord = !record;
      const updated =
        record && new Date(record.lastSyncAt) < new Date(magexRecord.updatedAt);

      if (newRecord) this.syncConfig.added && newRecords.add(magexRecord);
      if (updated) this.syncConfig.updated && updatedRecords.add(magexRecord);
    });

    return {
      newRecords: [...newRecords],
      updatedRecords: [...updatedRecords],
    };
  }

  identifyDeletedRecords(
    ourRecords: Entity[],
    magexRecords: _IMagex_DatabaseEntity[]
  ) {
    if (!this.syncConfig.deleted) return [];

    const magexIds = new Set(magexRecords.map((record) => record._id));
    return ourRecords.filter((record) => !magexIds.has(record._id));
  }

  async softDeleteRecords(records: Entity[]) {
    await Promise.all(
      records.map(async (record) => {
        await this.dataSource.manager.softRemove(record, { listeners: false });
      })
    );
  }

  async prepareRecords(records: _IMagex_DatabaseEntity[]) {
    return Promise.all(
      records.map(async (record) => {
        const entity = this.entityClone;
        Object.assign(entity, this.assignSearchableFields(record));
        Object.assign(entity, await this.assignRelations(record));
        Object.assign(entity, { lastSyncAt: new Date().toISOString() });
        return entity;
      })
    );
  }

  private assignSearchableFields(record: _IMagex_DatabaseEntity) {
    return this.handleSearchableFields
      ? this.handleSearchableFields(record)
      : record;
  }

  private async assignRelations(record: Entity | _IMagex_DatabaseEntity) {
    return this.handleRelationships
      ? await this.handleRelationships(record)
      : record;
  }

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
      ? CronExpression.EVERY_30_SECONDS
      : CronExpression.EVERY_5_SECONDS
  )
  async syncWithMagex() {
    if (process.env.NODE_ENV !== 'production') return;
    // @ts-expect-error - it has name
    console.log(`Syncing ${this.entity.name} with Magex`);

    const syncPromise = (async () => {
      await this.runDependencies();
      const [ourRecords, magexRecords] = (await Promise.all([
        this.fetchOurRecords(),
        this.fetchMagexRecords(),
      ])) as [Entity[], _IMagex_DatabaseEntity[]];

      const { newRecords, updatedRecords } = this.identifyOutOfSyncRecords(
        ourRecords,
        magexRecords
      );
      console.log(
        `New records: ${newRecords.length}, Updated records: ${updatedRecords.length}`
      );
      const preparedRecords = await this.prepareRecords([
        ...newRecords,
        ...updatedRecords,
      ]);

      await this.saveRecords(preparedRecords);

      const deletedRecords = this.identifyDeletedRecords(
        ourRecords,
        magexRecords
      );
      await this.softDeleteRecords(deletedRecords);
      // @ts-expect-error - it has name
      console.log(`Done syncing ${this.entity.name} with Magex`);
    })();

    EntitySyncer.syncStatusMap.set(this.entity, syncPromise);
    await syncPromise;
  }
}

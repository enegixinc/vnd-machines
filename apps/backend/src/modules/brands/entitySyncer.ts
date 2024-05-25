import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
} from 'typeorm';
import { Inject, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { timer } from 'execution-time-decorators';

@EventSubscriber()
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
  async syncNewRecords(records: MagexRecord[]) {
    for (const record of records) await this.addRecord(record);
  }

  @timer()
  async syncUpdatedRecords(records: MagexRecord[]) {
    for (const record of records) await this.updateRecord(record);
  }

  @timer()
  async addRecord(recordToAdd: MagexRecord) {
    const newRecord = this.dataSource.manager.create(
      this.listenTo(),
      recordToAdd
    );
    Object.assign(newRecord, { lastSyncAt: this.nowDate });
    await this.dataSource.manager.save(newRecord);
    console.log('Added new record:', newRecord);
  }

  @timer()
  async updateRecord(recordToUpdate: MagexRecord) {
    Object.assign(recordToUpdate, { lastSyncAt: this.nowDate });
    await this.dataSource.manager.update(
      this.listenTo(),
      recordToUpdate._id,
      recordToUpdate
    );
    console.log('Updated record:', recordToUpdate);
  }

  @Cron(CronExpression.EVERY_MINUTE)
  @timer()
  async syncWithMagex() {
    console.log('Syncing with Magex', this.listenTo().name);
    await Promise.all([this.fetchOurRecords(), this.timedFetchMagexRecords()]);

    const { newRecords, updatedRecords } = this.identifyOutOfSyncRecords();

    await Promise.all([
      this.syncNewRecords(newRecords),
      this.syncUpdatedRecords(updatedRecords),
    ]);
  }
}

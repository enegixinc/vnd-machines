import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { BrandEntity } from './brand.entity';
import { MagexService } from '../../services/magex/magex.service';
import { Inject, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ISerializedMagexBrand } from '@core';

@EventSubscriber()
export class BrandSubscriber
  implements EntitySubscriberInterface<BrandEntity>, OnModuleInit
{
  constructor(
    private readonly magexService: MagexService,
    @Inject(DataSource) protected dataSource: DataSource
  ) {
    dataSource.subscribers.push(this);
  }

  protected brands: BrandEntity[];
  protected magexBrands: ISerializedMagexBrand[];
  protected get brandsLookupTable() {
    return new Map(this.brands.map((brand) => [brand._id, brand]));
  }
  listenTo() {
    return BrandEntity;
  }

  async onModuleInit() {
    await this.fetchRecords();
    await this.syncWithMagex();
  }

  async fetchRecords() {
    this.brands = await this.dataSource.manager.find(BrandEntity);
    this.magexBrands = await this.magexService.brands.getBrandsByAccountName({
      // TODO: get account name from config/magexService
      accountName: 'tryvnd@point24h.com',
    });
    console.log('Our Records:', this.brands.length);
    console.log('Magex Records:', this.magexBrands.length);
  }

  get outOfSyncRecords() {
    const newRecords = new Set<ISerializedMagexBrand>();
    const updatedRecords = new Set<ISerializedMagexBrand>();

    this.magexBrands.filter((magexBrand) => {
      const brand = this.brandsLookupTable.get(magexBrand._id);
      if (!brand) newRecords.add(magexBrand);
      else if (new Date(brand.lastSyncAt) < new Date(magexBrand.updatedAt)) {
        updatedRecords.add(magexBrand);
      }
    });

    console.log('new records:', newRecords.size);
    console.log('updated records:', updatedRecords.size);

    return { newRecords, updatedRecords };
  }

  async addRecord(newBrand: ISerializedMagexBrand) {
    const brand = this.dataSource.manager.create(BrandEntity, newBrand);
    brand.lastSyncAt = new Date().toISOString();
    await this.dataSource.manager.save(brand);
    console.log('Added new brand:', newBrand);
  }

  async updateRecord(_id: string, updatedData: ISerializedMagexBrand) {
    Object.assign(updatedData, { lastSyncAt: new Date().toISOString() });
    await this.dataSource.manager.update(BrandEntity, _id, updatedData);
    console.log('Updated brand:', updatedData);
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async syncWithMagex() {
    await this.fetchRecords();
    const { newRecords, updatedRecords } = this.outOfSyncRecords;

    for (const newBrand of newRecords) {
      await this.addRecord(newBrand);
    }

    for (const updatedBrand of updatedRecords) {
      const brand = this.brandsLookupTable.get(updatedBrand._id);
      if (brand) await this.updateRecord(brand._id, updatedBrand);
    }
  }

  async beforeInsert(event: InsertEvent<BrandEntity>) {
    if (event.entity.lastSyncAt) return;

    const { newBrand } = await this.magexService.brands.postBrandsCreate({
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

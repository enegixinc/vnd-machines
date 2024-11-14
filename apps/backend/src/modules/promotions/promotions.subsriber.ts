import { DataSource, EventSubscriber, In, InsertEvent } from 'typeorm';
import { Inject } from '@nestjs/common';
import { PromotionEntity } from './promotion.entity';
import { EntitySyncer } from '../../common/entities/entity-syncer/entity-syncer';
import { MagexService } from '../../services/magex/magex.service';
import { MultiLangEntity } from '../products/entities/multiLang.entity';
import { ProductEntity } from '../products/entities/product.entity';
import { MachineEntity } from '../machines/entities/machine.entity';
import { CategoryEntity } from '../categories/category.entity';

@EventSubscriber()
export class PromotionSubscriber extends EntitySyncer<PromotionEntity> {
  constructor(
    @Inject(DataSource) protected readonly dataSource: DataSource,
    @Inject(MagexService) protected readonly magexService: MagexService
  ) {
    super(dataSource, magexService);
    this.dependsOn = [ProductEntity, MachineEntity];
  }

  listenTo() {
    return PromotionEntity;
  }

  handleSearchableFields(record: PromotionEntity): {
    fullName: string;
    searchableText: string;
  } {
    return {
      fullName: record.title,
      searchableText: MultiLangEntity.handleSearchableText([
        record._id,
        record.title,
        record.code,
        record.department,
        record.promoType,
        record.referTo,
      ]),
    };
  }

  preloadProducts(productIds?: string[]) {
    return productIds
      ? this.dataSource.manager.find(ProductEntity, {
          where: { _id: In(productIds) },
        })
      : this.dataSource.manager.find(ProductEntity);
  }

  preloadCategories(categoryIds?: string[]) {
    return categoryIds
      ? this.dataSource.manager.find(CategoryEntity, {
          where: { _id: In(categoryIds) },
        })
      : this.dataSource.manager.find(CategoryEntity);
  }

  preloadMachine(machineId?: string) {
    return machineId
      ? this.dataSource.manager.find(MachineEntity, {
          where: { _id: machineId },
        })
      : this.dataSource.manager.find(MachineEntity);
  }

  async handleRelationships(record: any) {
    console.log('handleRelationships record', record);
    const promotion = this.dataSource.manager.create(PromotionEntity, record);

    switch (record.cateOrProd) {
      case 'All Products':
        promotion.product = await this.preloadProducts();
        promotion.isAllProducts = true;
        break;
      case 'prod':
        promotion.product = await this.preloadProducts(
          record.product.map((p) => p._id)
        );
        break;
      case 'cate':
        promotion.category = await this.preloadCategories(
          record.category.map((p) => p._id)
        );
        break;
    }

    switch (record.machine.all) {
      case true:
        console.log('record.machine.all', record.machine.all);
        promotion.machine = await this.preloadMachine();
        promotion.isAllMachines = true;
        break;
      case false:
        console.log('record.machine.id._id', record.machine.id._id);
        promotion.machine = await this.preloadMachine(record.machine.id._id);
        break;
    }

    return promotion;
  }

  // async beforeInsert(event: InsertEvent<PromotionEntity>) {
  //   console.log('beforeInsert', event.entity);
  //   // Object.assign(event.entity, { product, machine });
  //
  //   event.entity = this.dataSource.manager.create(PromotionEntity, {
  //     ...event.entity,
  //     product,
  //     machine,
  //   });
  //
  //   console.log('handleRelationships', event.entity);
  //
  //   await super.beforeInsert(event);
  // }

  async afterInsert(event: InsertEvent<PromotionEntity>) {
    console.log('afterInsert', event.entity);
    // @ts-expect-error - sa
    if (event.entity.isOurRecord) {
      const product = await this.preloadProducts(
        event.entity.product as unknown as string[]
      );

      // @ts-expect-error - sa
      const isAllMachines = event.entity.machine.all;
      const machine = isAllMachines
        ? await this.preloadMachine()
        : await this.preloadMachine(
            // @ts-expect-error - sa
            event.entity.machine.id as unknown as string
          );

      console.log('updating isOurRecord');

      const record = this.dataSource.manager.create(PromotionEntity, {
        ...event.entity,
        product,
        machine,
        isAllMachines,
      });

      const saved = await event.manager.save(record, {
        listeners: false,
      });
      console.log('done updating isOurRecord', record);

      console.log('saved', saved);
    }
  }
}

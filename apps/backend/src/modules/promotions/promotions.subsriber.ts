import { DataSource, EventSubscriber, In } from 'typeorm';
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
      ? this.dataSource.manager.findOne(MachineEntity, {
          where: { _id: machineId },
        })
      : this.dataSource.manager.find(MachineEntity);
  }

  async handleRelationships(record: any): Promise<PromotionEntity> {
    const promotion = this.dataSource.manager.create(PromotionEntity, record);

    switch (record.cateOrProd) {
      case 'All Products':
        promotion.products = await this.preloadProducts();
        break;
      case 'prod':
        promotion.products = await this.preloadProducts(
          record.product.map((p) => p._id)
        );
        break;
      case 'cate':
        promotion.categories = await this.preloadCategories(
          record.product.map((p) => p._id)
        );
        break;
    }

    // Handle associated machines
    if (record.machine) {
      promotion.machines = record.machine.all
        ? await this.preloadMachine()
        : await this.preloadMachine(record.machine.id._id);
    }

    return promotion;
  }
}

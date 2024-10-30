import { DataSource, EventSubscriber } from 'typeorm';
import { Inject } from '@nestjs/common';
import { PromotionEntity } from './promotion.entity';
import { EntitySyncer } from '../../common/entities/entity-syncer/entity-syncer';
import { MagexService } from '../../services/magex/magex.service';
import { MultiLangEntity } from '../products/entities/multiLang.entity';
import { ProductEntity } from '../products/entities/product.entity';
import { MachineEntity } from '../machines/entities/machine.entity';

@EventSubscriber()
export class PromotionSubscriber extends EntitySyncer<PromotionEntity> {
  constructor(
    @Inject(DataSource) protected dataSource: DataSource,
    @Inject(MagexService) protected magexService: MagexService
  ) {
    super(dataSource, magexService);
    this.syncConfig = {
      added: true,
      updated: true,
      deleted: true,
    };
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

  async preloadProducts(productIds: string[]) {
    const promises = productIds.map(async (_id) => {
      return await this.dataSource.manager.findOne(ProductEntity, {
        withDeleted: true,
        where: { _id },
      });
    });
    return Promise.all(promises);
  }

  async preloadMachine(machineId: string) {
    return await this.dataSource.manager.findOne(MachineEntity, {
      withDeleted: true,
      where: { _id: machineId },
    });
  }

  async handleRelationships(record: any): Promise<PromotionEntity> {
    const productIds = record.product?.map((p) => p._id) ?? [];
    const loadedProducts = await this.preloadProducts(productIds);

    const promotion = this.dataSource.manager.create(PromotionEntity, record);

    promotion.products = loadedProducts;

    // Preload related machine if specified
    if (record.machine && !record.machine.all) {
      promotion.machine = await this.preloadMachine(record.machine.id._id);
    }

    return promotion;
  }
}

import { DataSource, EventSubscriber } from 'typeorm';
import { MagexService } from '../../services/magex/magex.service';
import { Inject } from '@nestjs/common';
import { EntitySyncer } from '../../common/entities/entity-syncer/entity-syncer';
import { ProductEntity } from '../products/entities/product.entity';
import { MachineEntity } from './entities/machine.entity';
import { MultiLangEntity } from '../products/entities/multiLang.entity';
import { MachineProduct } from './entities/machine-product.entity';

@EventSubscriber()
export class MachinesSubscriber extends EntitySyncer<MachineEntity> {
  constructor(
    @Inject(MagexService) protected readonly magexService: MagexService,
    @Inject(DataSource) protected dataSource: DataSource
  ) {
    super(dataSource, magexService);
    this.dependsOn = [ProductEntity];
  }

  listenTo() {
    return MachineEntity;
  }

  async handleRelationships(record: MachineEntity) {
    const products = await Promise.all(
      record.product.map(async (product) => {
        const resolvedProduct = await this.dataSource.manager.findOneBy(
          ProductEntity,
          {
            upc: product.upc,
          }
        );
        return this.dataSource.manager.create(MachineProduct, {
          machine: record,
          ...product,
          product: resolvedProduct,
        });
      })
    );

    return this.dataSource.manager.create(MachineEntity, {
      ...record,
      product: products,
    });
  }

  handleSearchableFields(record: MachineEntity): {
    fullName: string;
    searchableText: string;
  } {
    return {
      fullName: record.name,
      searchableText: MultiLangEntity.handleSearchableText([
        record._id,
        record.name,
        record.description,
      ]),
    };
  }
}

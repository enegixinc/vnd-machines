import { DataSource, EventSubscriber, In } from 'typeorm';
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

  private async getProducts(upc: string[] = []) {
    return await this.dataSource.manager.find(ProductEntity, {
      where: {
        upc: In(upc),
      },
      relations: ['supplier'],
    });
  }

  async handleRelationships(record: MachineEntity) {
    // const machineProducts = await Promise.all(
    //   record.product.map(async (product) => {
    //     const resolvedProduct = await this.dataSource.manager.findOneBy(
    //       ProductEntity,
    //       {
    //         upc: product.upc,
    //       }
    //     );
    //
    //     if (product.machine) return;
    //
    //     return this.dataSource.manager.create(MachineProduct, {
    //       product: resolvedProduct,
    //       machine: record,
    //       ...product,
    //     });
    //   })
    // );

    const products = await this.getProducts(
      record.product.map((product) => product.upc)
    );

    const suppliers = products
      .filter((product) => product.supplier)
      .map((product) => product.supplier);
    console.dir(suppliers, { depth: 5 });

    const machineProducts = products.map((product) => {
      const machineProduct = record.product.find((p) => p.upc === product.upc);

      return this.dataSource.manager.create(MachineProduct, {
        product,
        machine: record,
        ...machineProduct,
      });
    });

    return this.dataSource.manager.create(MachineEntity, {
      ...record,
      product: machineProducts,
      suppliers,
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

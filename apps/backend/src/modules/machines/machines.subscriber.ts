import { DataSource, EventSubscriber } from 'typeorm';
import { MagexService } from '../../services/magex/magex.service';
import { Inject } from '@nestjs/common';
import { EntitySyncer } from '../../common/entities/entity-syncer/entity-syncer';
import { ProductEntity } from '../products/product.entity';
import { MachineEntity } from './entities/machine.entity';

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
}

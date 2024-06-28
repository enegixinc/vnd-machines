import { ContractEntity } from './entities/contract.entity';
import {
  EntitySubscriberInterface,
  InsertEvent,
  Repository,
  UpdateEvent,
} from 'typeorm';
import { FilesService } from '../files/files.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ContractStatus, ReferenceByID } from '@core';
import { UserEntity } from '../users/entities/user.entity';

export class ContractsSubscriber
  implements EntitySubscriberInterface<ContractEntity>
{
  constructor(
    private readonly filesService: FilesService,
    @InjectRepository(ContractEntity)
    private readonly repository: Repository<ContractEntity>
  ) {}

  listenTo() {
    return ContractEntity;
  }

  async checkActiveContract(supplier: ReferenceByID<UserEntity>) {
    const activeContract = await this.repository.findOne({
      where: {
        supplier: { _id: supplier._id },
        status: ContractStatus.ACTIVE,
      },
    });
    if (activeContract) {
      throw new Error('This supplier has an active contract');
    }
  }
  async beforeInsert(event: InsertEvent<ContractEntity>) {
    return await this.checkActiveContract(event.entity.supplier);
  }

  async beforeUpdate(event: UpdateEvent<ContractEntity>) {
    return await this.checkActiveContract(event.entity.supplier);
  }
}

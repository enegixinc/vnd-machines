import { ContractEntity } from './entities/contract.entity';
import {
  DataSource,
  EntitySubscriberInterface,
  InsertEvent,
  RemoveEvent,
  Repository,
  UpdateEvent,
} from 'typeorm';
import { FilesService } from '../files/files.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ContractStatus, ReferenceByID } from '@core';
import { UserEntity } from '../users/entities/user.entity';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { GlobalResponseError } from '../../common/responses/GlobalResponseError.dto';

export class ContractsSubscriber
  implements EntitySubscriberInterface<ContractEntity>
{
  constructor(
    @InjectRepository(ContractEntity)
    private readonly repository: Repository<ContractEntity>,
    @Inject(DataSource) protected dataSource: DataSource
  ) {
    this.dataSource.subscribers.push(this);
  }

  listenTo() {
    return ContractEntity;
  }

  async supplierHasActiveContract(contract: ContractEntity) {
    console.log('Checking active contract', contract);
    const activeContract = await this.repository.findOne({
      where: {
        supplier: { _id: contract.supplier._id },
        status: ContractStatus.ACTIVE,
      },
    });
    if (activeContract) {
      const errorMessage = `Supplier already has an active contract.`;
      const transformedErrors: { [key: string]: string[] } = {
        supplier: [errorMessage],
      };

      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          message: errorMessage,
          errors: transformedErrors,
        },
        HttpStatus.CONFLICT
      );
    }
  }
  async beforeInsert(event: InsertEvent<ContractEntity>) {
    return await this.supplierHasActiveContract(event.entity);
  }

  async beforeUpdate(event: UpdateEvent<ContractEntity>) {
    console.log('Before update', event.entity);
  }

  private async terminateContract(contractId: string) {
    return await this.repository.update(contractId, {
      status: ContractStatus.TERMINATED,
    });
  }

  async beforeSoftRemove(event: RemoveEvent<ContractEntity>) {
    const contract = event.entity;
    return await this.terminateContract(contract._id);
  }

  async beforeRemove(event: RemoveEvent<ContractEntity>) {
    const contract = event.entity;
    return await this.terminateContract(contract._id);
  }
}

import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContractStatus, ReferenceByID } from '@core';
import { ContractEntity } from '../entities/contract.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { forwardRef, Inject } from '@nestjs/common';

@ValidatorConstraint({ async: true })
export class IsNoActiveContract implements ValidatorConstraintInterface {
  constructor(
    @Inject(forwardRef(() => ContractEntity))
    @InjectRepository(ContractEntity)
    private readonly repository: Repository<ContractEntity>
  ) {}

  async validate(
    supplier: ReferenceByID<UserEntity>,
    args: ValidationArguments
  ) {
    const activeContract = await this.repository.findOne({
      where: {
        supplier: { _id: supplier._id },
        status: ContractStatus.ACTIVE,
      },
    });
    return !activeContract;
  }

  defaultMessage(args: ValidationArguments) {
    return 'This supplier has an active contract';
  }
}

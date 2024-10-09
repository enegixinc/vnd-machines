import { Injectable } from '@nestjs/common';
import { ValidatorConstraint } from 'class-validator';

import { ContractsService } from '../contracts.service';
import { EntityExistsValidator } from '../../../common/validators/exists.validator';

@Injectable()
@ValidatorConstraint({ async: true })
export class ContractExistsValidator extends EntityExistsValidator {
  constructor(protected readonly ContractService: ContractsService) {
    super(ContractService);
  }

  protected get EntityName(): string {
    return 'contract';
  }
}

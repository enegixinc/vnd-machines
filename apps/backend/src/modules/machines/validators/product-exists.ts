import { Injectable } from '@nestjs/common';
import { ValidatorConstraint } from 'class-validator';
import { EntityExistsValidator } from '../../../common/validators/exists.validator';
import { MachinesService } from '../machines.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class MachineExistsValidator extends EntityExistsValidator {
  constructor(protected readonly machinesService: MachinesService) {
    super(machinesService);
  }

  protected get EntityName(): string {
    return 'Machine';
  }
}

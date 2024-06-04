import { Injectable } from '@nestjs/common';
import { ValidatorConstraint } from 'class-validator';

import { UsersService } from '../users.service';
import { EntityExistsValidator } from '../../../common/validators/exists.validator';

@Injectable()
@ValidatorConstraint({ async: true })
export class UserExistsValidator extends EntityExistsValidator {
  constructor(protected readonly userService: UsersService) {
    super(userService);
  }

  protected get EntityName(): string {
    return 'User';
  }
}

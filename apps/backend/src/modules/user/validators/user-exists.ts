import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../user.service';

@Injectable()
@ValidatorConstraint({ name: 'UserExists', async: true })
export class UserExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) {}

  async validate(id: string) {
    return !!(await this.userService.findOneBy({ id }));
  }

  defaultMessage() {
    return `User doesn't exist`;
  }
}

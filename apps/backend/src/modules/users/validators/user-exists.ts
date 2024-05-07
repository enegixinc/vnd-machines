import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../users.service';
import { IUserEntity } from '@core';

// TODO: make this abstract class
@Injectable()
@ValidatorConstraint({ name: 'UserExists', async: true })
export class UserExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly userService: UsersService) {}

  async validate(user: IUserEntity) {
    console.log('UserExistsValidator', user);
    return !!(await this.userService.findOneBy({ _id: user._id }));
  }

  defaultMessage() {
    return `User doesn't exist`;
  }
}

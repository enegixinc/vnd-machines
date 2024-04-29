import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjs-library/crud';

import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { ApiProperty } from '@nestjs/swagger';

// isSuccess, message, data
class UnifiedResponse {
  @ApiProperty()
  isSuccess: boolean;

  @ApiProperty()
  message: string;
  data: any;

  constructor(isSuccess: boolean, message: string, data: any) {
    this.isSuccess = isSuccess;
    this.message = message;
    this.data = data;
  }
}

@Crud({
  entity: UserEntity,
  routes: {
    create: {
      swagger: {},
    },
  },
})
@Controller('users')
export class UserController implements CrudController<UserEntity> {
  constructor(public readonly crudService: UserService) {}
}

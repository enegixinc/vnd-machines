import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjs-library/crud';

import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Crud({ entity: UserEntity })
@Controller('users')
export class UserController implements CrudController<UserEntity> {
  constructor(public readonly crudService: UserService) {}
}

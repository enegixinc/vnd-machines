import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/response/update-user.dto';
import { SerializedUserDto } from './dto/response/serialized-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Crud({
  model: {
    type: UserEntity,
  },
  dto: {
    create: CreateUserDto,
    update: UpdateUserDto,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  query: {
    cache: 2000,
    alwaysPaginate: true,
    sort: [
      {
        field: 'createdAt',
        order: 'DESC',
      },
    ],
    softDelete: true,
    exclude: ['password'],
    limit: 20,
    maxLimit: 100,
  },
  routes: {
    exclude: ['replaceOneBase'],
  },

  serialize: {
    create: SerializedUserDto,
    update: SerializedUserDto,
    get: SerializedUserDto,
    getMany: SerializedUserDto,
    createMany: SerializedUserDto,
    delete: SerializedUserDto,
    recover: SerializedUserDto,
    replace: SerializedUserDto,
  },
})
@Controller('users')
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiTags('users')
export class UserController implements CrudController<UserEntity> {
  constructor(public service: UserService) {}

  get base(): CrudController<UserEntity> {
    return this;
  }
}

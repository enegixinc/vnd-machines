import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/response/update-user.dto';
import { SerializedUserDto } from './dto/response/serialized-user.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { saneOperationsId } from '../../common/swagger.config';

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
      field: '_id',
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
    limit: 10,

    join: {
      products: {},
      categories: {},
      brands: {},
      contracts: {},
      orders: {},
    },
  },
  routes: {
    ...saneOperationsId,
    // createOneBase: {
    //   decorators: [...saneOperationsId.createOneBase.decorators, Public],
    // },
    exclude: ['replaceOneBase'],
  },
  serialize: {
    get: SerializedUserDto,
    getMany: SerializedUserDto,
    create: SerializedUserDto,
  },
})
@Controller('users')
@ApiBearerAuth('access-token')
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiTags('users')
export class UsersController implements CrudController<UserEntity> {
  constructor(public service: UsersService) {}

  get base(): CrudController<UserEntity> {
    return this;
  }
}

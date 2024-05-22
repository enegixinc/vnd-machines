import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/response/update-user.dto';
import { SerializedUserDto } from './dto/response/serialized-user.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { saneOperationsId } from '../../common/swagger.config';
import { Public } from '../auth/decorators/public.decorator';

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
    limit: 20,
    maxLimit: 100,
    join: {
      products: {
        eager: true,
      },
      categories: {
        eager: true,
      },
      brands: {
        eager: true,
      },
      contracts: {
        eager: true,
      },
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
    create: SerializedUserDto,
    update: SerializedUserDto,
  },
})
@Controller('users')
@ApiBearerAuth('access-token')
@Public()
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiTags('users')
export class UsersController implements CrudController<UserEntity> {
  constructor(public service: UsersService) {}

  get base(): CrudController<UserEntity> {
    return this;
  }
}

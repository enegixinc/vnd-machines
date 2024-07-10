import { Controller } from '@nestjs/common';
import { Crud, CrudAuth, CrudController } from '@dataui/crud';
import { saneOperationsId } from '../../../common/swagger.config';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateFillRequestDto } from './dto/create-fill-request.dto';
import { RequestsService } from './requests.service';
import { FillRequestEntity } from './fill-request.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { UserRole } from '@core';

@Crud({
  model: {
    type: FillRequestEntity,
  },
  dto: {
    create: CreateFillRequestDto,
  },
  params: {
    id: {
      field: '_id',
      type: 'string',
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
    limit: 20,
    maxLimit: 100,
    join: {
      machine: {
        alias: 'machine',
      },
      products: {
        alias: 'products',
        eager: true,
      },
      'products.product': {
        alias: 'singleProduct',
        eager: true,
      },
    },
  },
  routes: {
    ...saneOperationsId,
    exclude: ['replaceOneBase'],
  },
})
@CrudAuth({
  property: 'user',
  // if admin return everything, if supplier return the products they supply
  // or the products they created
  filter: (user: UserEntity) => {
    if (user.role === UserRole.ADMIN) return;

    return {
      $or: [
        {
          createdBy: user._id,
        },
        {
          'products.supplier_id': user._id,
        },
      ],
    };
  },
  persist: (user: UserEntity) => ({
    createdBy: user._id,
  }),
})
@ApiBearerAuth('access-token')
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiTags('requests')
@ApiBearerAuth('JWT-auth')
@Controller('requests')
export class RequestsController implements CrudController<FillRequestEntity> {
  constructor(public service: RequestsService) {}

  get base(): CrudController<FillRequestEntity> {
    return this;
  }
}

import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { OrdersService } from './orders.service';
import { OrderEntity } from './orders.entity';
import { saneOperationsId } from '../../common/swagger.config';
import { SerializedBrandDto } from '../brands/dto/response/serialized-brand.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@Crud({
  model: {
    type: OrderEntity,
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
      products: {},
    },
  },
  routes: {
    ...saneOperationsId,
    exclude: [
      'replaceOneBase',
      'createManyBase',
      'deleteOneBase',
      'updateOneBase',
      'recoverOneBase',
      'createOneBase',
    ],
  },
  serialize: {
    get: SerializedBrandDto,
    create: SerializedBrandDto,
    update: SerializedBrandDto,
  },
})
@Controller('orders')
@ApiBearerAuth('access-token')
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiTags('orders')
@ApiBearerAuth('JWT-auth')
export class OrdersController implements CrudController<OrderEntity> {
  constructor(public service: OrdersService) {}

  get base(): CrudController<OrderEntity> {
    return this;
  }
}

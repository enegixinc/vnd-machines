import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { OrdersService } from './orders.service';
import { OrderEntity } from './order.entity';
import { saneOperationsId } from '../../common/swagger.config';
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
      products: {
        alias: 'products',
        eager: true,
      },
      'products.product': {
        alias: 'product',
      },
      'products.product.supplier': {
        alias: 'supplier',
        allow: ['_id', 'fullName'],
      },
      'products.product.category': {
        alias: 'category',
        allow: ['_id', 'fullName'],
      },
      'products.product.brand': {
        alias: 'brand',
        allow: ['_id', 'fullName'],
      },
      machine: {
        alias: 'machine',
      },
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

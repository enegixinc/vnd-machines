import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { ProductEntity } from './product.entity';
import { ProductsService } from './products.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Crud({
  model: {
    type: ProductEntity,
  },
  params: {
    id: {
      field: 'id',
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
    exclude: ['password'],
    limit: 20,
    maxLimit: 100,
  },
  routes: {
    exclude: ['replaceOneBase'],
  },
})
@Controller('products')
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiTags('products')
export class ProductsController implements CrudController<ProductEntity> {
  constructor(public service: ProductsService) {}

  get base(): CrudController<ProductEntity> {
    return this;
  }
}

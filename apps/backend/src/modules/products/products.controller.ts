import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { ProductEntity } from './product.entity';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/request/create-product.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SerializedProductDto } from './dto/response/serialized-product.dto';

@Crud({
  model: {
    type: ProductEntity,
  },
  dto: {
    create: CreateProductDto,
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
    exclude: ['password'],
    limit: 20,
    maxLimit: 100,
    join: {
      suppliers: {
        exclude: ['products'],
        eager: true,
      },
    },
  },
  routes: {
    exclude: ['replaceOneBase'],
  },
  serialize: {
    getMany: SerializedProductDto,
    get: SerializedProductDto,
    create: SerializedProductDto,
    replace: SerializedProductDto,
    recover: SerializedProductDto,
    delete: SerializedProductDto,
    createMany: SerializedProductDto,
    update: SerializedProductDto,
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

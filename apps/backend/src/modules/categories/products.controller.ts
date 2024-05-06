import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { CategoryEntity } from './category.entity';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/request/create-product.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SerializedProductDto } from './dto/response/serialized-product.dto';

@Crud({
  model: {
    type: CategoryEntity,
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
    limit: 20,
    maxLimit: 100,
    join: {
      suppliers: {
        alias: 'users',
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
@ApiBearerAuth('JWT-auth')
export class ProductsController implements CrudController<CategoryEntity> {
  constructor(public service: ProductsService) {}

  get base(): CrudController<CategoryEntity> {
    return this;
  }
}

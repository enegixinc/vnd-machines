import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { BrandEntity } from './brand.entity';
import { BrandsService } from './brands.service';
import { CreateProductDto } from './dto/request/create-product.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SerializedProductDto } from './dto/response/serialized-product.dto';

@Crud({
  model: {
    type: BrandEntity,
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
export class BrandsController implements CrudController<BrandEntity> {
  constructor(public service: BrandsService) {}

  get base(): CrudController<BrandEntity> {
    return this;
  }
}

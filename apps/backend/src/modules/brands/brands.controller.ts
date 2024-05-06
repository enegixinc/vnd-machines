import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { BrandEntity } from './brand.entity';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/request/create-brand.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SerializedBrandDto } from './dto/response/serialized-brand.dto';

@Crud({
  model: {
    type: BrandEntity,
  },
  dto: {
    create: CreateBrandDto,
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
    getMany: SerializedBrandDto,
    get: SerializedBrandDto,
    create: SerializedBrandDto,
    replace: SerializedBrandDto,
    recover: SerializedBrandDto,
    delete: SerializedBrandDto,
    createMany: SerializedBrandDto,
    update: SerializedBrandDto,
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
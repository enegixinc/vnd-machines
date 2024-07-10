import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { BrandEntity } from './brand.entity';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/request/create-brand.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SerializedBrandDto } from './dto/response/serialized-brand.dto';
import { saneOperationsId } from '../../common/swagger.config';
import { UpdateBrandDto } from './dto/response/update-brand.dto';

@Crud({
  model: {
    type: BrandEntity,
  },
  dto: {
    create: CreateBrandDto,
    update: UpdateBrandDto,
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
    limit: 10,

    join: {
      suppliers: {
        alias: 'users',
        exclude: ['password'],
      },
      products: {},
      categories: {},
      orders: {},
    },
  },
  routes: {
    ...saneOperationsId,
    exclude: ['replaceOneBase'],
  },
  serialize: {
    get: SerializedBrandDto,
    create: SerializedBrandDto,
    update: SerializedBrandDto,
  },
})
@Controller('brands')
@ApiBearerAuth('access-token')
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiTags('brands')
@ApiBearerAuth('JWT-auth')
export class BrandsController implements CrudController<BrandEntity> {
  constructor(public service: BrandsService) {}

  get base(): CrudController<BrandEntity> {
    return this;
  }
}

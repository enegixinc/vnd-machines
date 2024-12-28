import { Controller } from '@nestjs/common';
import { Crud, CrudAuth, CrudController } from '@dataui/crud';
import { BrandEntity } from './brand.entity';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/request/create-brand.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SerializedBrandDto } from './dto/response/serialized-brand.dto';
import { saneOperationsId } from '../../common/swagger.config';
import { UpdateBrandDto } from './dto/response/update-brand.dto';
import { UserEntity } from '../users/entities/user.entity';
import { UserRole } from '@core';

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
      products: {
        alias: 'products',
        eager: true,
      },
      'products.product': {
        alias: 'product',
      },
      orders: {
        alias: 'orders',
        // allow: ['_id', 'supplier_id', 'product_id', 'category_id'],
      },
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
@CrudAuth({
  property: 'user',
  filter: (user: UserEntity) => {
    if (user.role === UserRole.SUPPLIER) {
      return {
        $and: [
          {
            'products.supplier_id': user._id,
          },
          // {
          //   'orders.supplier_id': user._id,
          // },
        ],
      };
    }
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

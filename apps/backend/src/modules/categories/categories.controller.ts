import { Controller } from '@nestjs/common';
import { Crud, CrudAuth, CrudController } from '@dataui/crud';
import { CategoryEntity } from './category.entity';
import { CategoriesService } from './categories.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SerializedCategoryDto } from './dto/response/serialized-category.dto';
import { saneOperationsId } from '../../common/swagger.config';
import { UpdateCategoryDto } from './dto/response/update-category.dto';
import { CreateCategoryDto } from './dto/request/create-category.dto';
import { UserRole } from '@core';
import { UserEntity } from '../users/entities/user.entity';

@Crud({
  model: {
    type: CategoryEntity,
  },
  dto: {
    create: CreateCategoryDto,
    update: UpdateCategoryDto,
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
    get: SerializedCategoryDto,
    create: SerializedCategoryDto,
    update: SerializedCategoryDto,
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
@Controller('categories')
@ApiBearerAuth('access-token')
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiTags('categories')
export class CategoriesController implements CrudController<CategoryEntity> {
  constructor(public service: CategoriesService) {}

  get base(): CrudController<CategoryEntity> {
    return this;
  }
}

import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { CategoryEntity } from './category.entity';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/request/create-category.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SerializedCategoryDto } from './dto/response/serialized-category.dto';

@Crud({
  model: {
    type: CategoryEntity,
  },
  dto: {
    create: CreateCategoryDto,
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
    getMany: SerializedCategoryDto,
    get: SerializedCategoryDto,
    create: SerializedCategoryDto,
    replace: SerializedCategoryDto,
    recover: SerializedCategoryDto,
    delete: SerializedCategoryDto,
    createMany: SerializedCategoryDto,
    update: SerializedCategoryDto,
  },
})
@Controller('products')
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiTags('products')
@ApiBearerAuth('JWT-auth')
export class CategoriesController implements CrudController<CategoryEntity> {
  constructor(public service: CategoriesService) {}

  get base(): CrudController<CategoryEntity> {
    return this;
  }
}

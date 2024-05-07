import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { CategoryEntity } from './category.entity';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/request/create-category.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SerializedCategoryDto } from './dto/response/serialized-category.dto';
import { saneOperationsId } from '../../common/swagger.config';

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
      products: {
        eager: true,
      },
      brands: {
        eager: true,
      },
    },
  },
  routes: {
    ...saneOperationsId,
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
@Controller('categories')
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiTags('categories')
@ApiBearerAuth('JWT-auth')
export class CategoriesController implements CrudController<CategoryEntity> {
  constructor(public service: CategoriesService) {}

  get base(): CrudController<CategoryEntity> {
    return this;
  }
}

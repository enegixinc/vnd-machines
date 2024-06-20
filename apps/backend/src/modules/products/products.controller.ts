import { Controller, Get, Query } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { ProductEntity } from './entities/product.entity';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/request/create-product.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SerializedProductDto } from './dto/response/serialized-product.dto';
import { saneOperationsId } from '../../common/swagger.config';
import { UpdateProductDto } from './dto/request/update-product.dto';

@Crud({
  model: {
    type: ProductEntity,
  },
  dto: {
    create: CreateProductDto,
    update: UpdateProductDto,
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
      // TODO: deprecate these aliases and use the actual entity names
      supplier: {
        exclude: ['password'],
      },
      brand: {
        alias: 'brands',
      },
      category: {
        alias: 'categories',
      },
      orders: {},

      // 'suppliers.brands': {
      //   eager: true,
      //   alias: 'brands',
      // },
      // 'suppliers.products': {
      //   eager: true,
      //   alias: 'products',
      // },
      // 'suppliers.categories': {
      //   eager: true,
      //   alias: 'categories',
      // },
    },
  },
  routes: {
    ...saneOperationsId,
    exclude: ['replaceOneBase'],
  },
  serialize: {
    get: SerializedProductDto,
    create: SerializedProductDto,
    update: SerializedProductDto,
  },
})
@Controller('products')
@ApiBearerAuth('access-token')
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiTags('products')
export class ProductsController implements CrudController<ProductEntity> {
  constructor(private readonly productsService: ProductsService) {}
  service = this.productsService;

  @Get('/search')
  @ApiResponse({
    status: 200,
    description: 'Search products',
    type: ProductEntity,
    isArray: true,
  })
  async search(@Query('query') query: string): Promise<ProductEntity[]> {
    return this.service.search(query);
  }
}

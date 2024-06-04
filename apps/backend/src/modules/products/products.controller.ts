import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { ProductEntity } from './product.entity';
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
        alias: 'users',
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

  // @Public()
  // @Post('add-supplier')
  // async addSupplier(
  //   @Param('productId') productId: string,
  //   @Param('supplierId') supplierId: string
  // ) {
  //   return this.productsService.addSupplier(productId, supplierId);
  // }
}

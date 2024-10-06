import { Controller, Get, Query } from '@nestjs/common';
import { Crud, CrudAuth, CrudController } from '@dataui/crud';
import { ProductEntity, ProductStatus } from './entities/product.entity';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/request/create-product.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SerializedProductDto } from './dto/response/serialized-product.dto';
import { saneOperationsId } from '../../common/swagger.config';
import { UpdateProductDto } from './dto/request/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { UserRole } from '@core';

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
    limit: 10,

    join: {
      supplier: {
        exclude: ['password'],
      },
      brand: {},
      category: {},
      orders: {},
      machines: {},
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
@CrudAuth({
  property: 'user',
  // if admin return everything, if supplier return the products they supply
  // or the products they created
  filter: (user: UserEntity) => {
    if (user.role === UserRole.ADMIN) return;

    return {
      $or: [
        {
          createdBy: user._id,
        },
        {
          supplier_id: user._id,
        },
      ],
    };
  },
  persist: (user: UserEntity) => ({
    createdBy: user._id,
    status:
      user.role === UserRole.ADMIN
        ? ProductStatus.ACTIVE
        : ProductStatus.PENDING,
  }),
})
@Controller('products')
@ApiBearerAuth('access-token')
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiTags('products')
export class ProductsController implements CrudController<ProductEntity> {
  constructor(
    private readonly productsService: ProductsService,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) {}

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

  @Get('/stats')
  @ApiResponse({
    status: 200,
    description: 'Get product statistics',
    type: () => ({
      totalActiveRevenue: Number,
    }),
  })
  async stats() {
    const totalActiveRevenue = await this.productRepository.query(`
      SELECT COALESCE(SUM(
                        CASE
                          WHEN C."feeType" = 'fixed' THEN COALESCE(C."feePerSale", 0)
                          WHEN C."feeType" = 'percentage' THEN COALESCE(OD."soldPrice" * (C."feePerSale" / 100), 0)
                          ELSE 0
                          END
                      ), 0)
      FROM orders AS O
             JOIN order_details AS OD ON OD.order_id = O._id
             JOIN products AS P ON P._id = OD.product_id
             JOIN contracts AS C ON C.supplier_id = P.supplier_id
      WHERE C.status = 'active'
        AND C."startDate" <= O."createdAt"
        AND O."createdAt" <= C."endDate"
    `);

    return {
      totalActiveRevenue: parseFloat(totalActiveRevenue[0].coalesce),
    };
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { ProductEntity } from './entities/product.entity';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/request/create-product.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SerializedProductDto } from './dto/response/serialized-product.dto';
import { saneOperationsId } from '../../common/swagger.config';
import { UpdateProductDto } from './dto/request/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
  })
  async stats() {
    // const sumTotalSales = await this.productRepository.sum('soldPrice');
  }
  //
  // private async calculateTotalSalesBetween(
  //   start: Date,
  //   end: Date
  // ): Promise<number> {
  //   const result = await this.productRepository.query(
  //     `
  //       SELECT COALESCE(SUM(OD.quantity * P.price), 0) AS total
  //       FROM orders O
  //              JOIN order_details OD ON OD.order_id = O._id
  //              JOIN products P ON OD.product_id = P._id
  //       WHERE O."createdAt" < $1
  //         AND O."createdAt" >= $2
  //     `,
  //     [end, start]
  //   );
  //   return parseFloat(result[0].total);
  // }
  //
  // private async getTotalProducts(): Promise<number> {
  //   return this.productRepository.count();
  // }
  //
  // private async getTotalRevenue(): Promise<number> {
  //   const result = await this.productRepository.query(
  //     `
  //     SELECT COALESCE(SUM(OD.quantity * P.price), 0) AS total
  //     FROM orders O
  //     JOIN order_details OD ON OD.order_id = O._id
  //     JOIN products P ON OD.product_id = P._id
  //   `
  //   );
  //   return parseFloat(result[0].total);
  // }
  //
  // private async getTotalActiveRevenue(): Promise<number> {
  //   const result = await this.productRepository.query(
  //     `
  //     SELECT COALESCE(SUM(OD.quantity * P.price), 0) AS total
  //     FROM orders O
  //     JOIN order_details OD ON OD.order_id = O._id
  //     JOIN products P ON OD.product_id = P._id
  //     WHERE O.status = 'active'
  //   `
  //   );
  //   return parseFloat(result[0].total);
  // }
  //
  // private calculatePercentageChange(current: number, previous: number): number {
  //   if (previous === 0) return current === 0 ? 0 : 100;
  //   return ((current - previous) / previous) * 100;
  // }
  //
  // @Get('/stats')
  // @ApiResponse({
  //   status: 200,
  //   description: 'Get product statistics',
  // })
  // async stats() {
  //   const today = new Date();
  //   const yesterday = new Date(today);
  //   yesterday.setDate(yesterday.getDate() - 1);
  //   const lastWeek = new Date(today);
  //   lastWeek.setDate(lastWeek.getDate() - 7);
  //   const lastMonth = new Date(today);
  //   lastMonth.setMonth(lastMonth.getMonth() - 1);
  //   const lastYear = new Date(today);
  //   lastYear.setFullYear(lastYear.getFullYear() - 1);
  //
  //   const totalProducts = await this.getTotalProducts();
  //   const totalRevenue = await this.getTotalRevenue();
  //   const totalActiveRevenue = await this.getTotalActiveRevenue();
  //
  //   const salesToday = await this.calculateTotalSalesBetween(yesterday, today);
  //   const salesYesterday = await this.calculateTotalSalesBetween(
  //     lastWeek,
  //     yesterday
  //   );
  //   const salesLastWeek = await this.calculateTotalSalesBetween(
  //     lastMonth,
  //     lastWeek
  //   );
  //   const salesLastMonth = await this.calculateTotalSalesBetween(
  //     lastYear,
  //     lastMonth
  //   );
  //
  //   const changeWeek = this.calculatePercentageChange(
  //     salesToday,
  //     salesYesterday
  //   );
  //   const changeMonth = this.calculatePercentageChange(
  //     salesToday,
  //     salesLastWeek
  //   );
  //   const changeYear = this.calculatePercentageChange(
  //     salesToday,
  //     salesLastMonth
  //   );
  //
  //   return {
  //     totalProducts,
  //     totalRevenue,
  //     totalActiveRevenue,
  //     salesToday,
  //     salesYesterday,
  //     salesLastWeek,
  //     salesLastMonth,
  //     changeWeek,
  //     changeMonth,
  //     changeYear,
  //   };
  // }
}

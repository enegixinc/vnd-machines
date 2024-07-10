import { Controller, Get } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { OrdersService } from './orders.service';
import { OrderEntity } from './order.entity';
import { saneOperationsId } from '../../common/swagger.config';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderProductsDetails } from './order-details.entity';
import { getPeriods } from '../../common/periods';

@Crud({
  model: {
    type: OrderEntity,
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
      products: {
        alias: 'products',
      },
      'products.product': {
        alias: 'product',
      },
      'products.product.supplier': {
        alias: 'supplier',
        allow: ['_id', 'fullName'],
      },
      'products.product.category': {
        alias: 'category',
        allow: ['_id', 'fullName'],
      },
      'products.product.brand': {
        alias: 'brand',
        allow: ['_id', 'fullName'],
      },
      machine: {
        alias: 'machine',
      },
    },
  },
  routes: {
    ...saneOperationsId,
    exclude: [
      'replaceOneBase',
      'createManyBase',
      'deleteOneBase',
      'updateOneBase',
      'recoverOneBase',
      'createOneBase',
    ],
  },
})
@Controller('orders')
@ApiBearerAuth('access-token')
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiTags('orders')
@ApiBearerAuth('JWT-auth')
export class OrdersController implements CrudController<OrderEntity> {
  constructor(
    public service: OrdersService,
    @InjectRepository(OrderProductsDetails)
    private readonly orderRepository: Repository<OrderProductsDetails>
  ) {}

  get base(): CrudController<OrderEntity> {
    return this;
  }

  @Get('/stats')
  @ApiResponse({
    status: 200,
    description: 'Get product statistics',
  })
  async stats() {
    const periods = getPeriods();

    const sum = await this.orderRepository.query(`
      SELECT COALESCE(SUM(od."soldPrice"), 0) AS total
      FROM order_details od
    `);

    const periodsStats = {};
    for (const period of periods) {
      const totalRevenue = await this.orderRepository.query(`
        SELECT COALESCE(SUM(od."soldPrice"), 0) AS total_sales
        FROM orders o
               JOIN order_details od ON o._id = od.order_id
        WHERE o."createdAt" >= '${period.start.toISOString()}'
          AND o."createdAt" <= '${period.end.toISOString()}'
      `);

      periodsStats[period.key] = parseFloat(totalRevenue[0].total_sales) || 0;
    }

    return {
      totalSales: {
        all: parseFloat(sum[0].total) || 0,
        ...periodsStats,
      },
    };
  }
}

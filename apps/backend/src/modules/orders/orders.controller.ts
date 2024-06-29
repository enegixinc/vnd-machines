import { Controller, Get } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { OrdersService } from './orders.service';
import { OrderEntity } from './order.entity';
import { saneOperationsId } from '../../common/swagger.config';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderProductsDetails } from './order-details.entity';

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
    limit: 20,
    maxLimit: 100,
    join: {
      products: {
        alias: 'products',
        eager: true,
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
    const periods = [
      {
        label: 'Today',
        key: 'today',
        start: new Date(new Date().setHours(0, 0, 0, 0)),
        end: new Date(new Date().setHours(23, 59, 59, 999)),
      },
      {
        label: 'Last 7 days',
        key: 'last7Days',
        start: new Date(new Date().setDate(new Date().getDate() - 6)),
        end: new Date(new Date().setHours(23, 59, 59, 999)),
      },
      {
        label: 'Last month',
        key: 'lastMonth',
        start: new Date(
          new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)
        ),
        end: new Date(
          new Date(new Date().setDate(0)).setHours(23, 59, 59, 999)
        ),
      },
      {
        label: 'Last year',
        key: 'lastYear',
        start: new Date(
          new Date(
            new Date().setFullYear(new Date().getFullYear() - 1, 0, 1)
          ).setHours(0, 0, 0, 0)
        ),
        end: new Date(
          new Date(
            new Date().setFullYear(new Date().getFullYear() - 1, 11, 31)
          ).setHours(23, 59, 59, 999)
        ),
      },
    ];

    const sum = await this.orderRepository
      .createQueryBuilder('order')
      .select('SUM(order.soldPrice)', 'total')
      .getRawOne();

    let periodsStats = {};
    for (const period of periods) {
      const totalRevenue = await this.orderRepository
        .createQueryBuilder('order')
        .where('order.createdAt BETWEEN :start AND :end', {
          start: period.start,
          end: period.end,
        })
        .select('SUM(order.soldPrice)', 'total')
        .getRawOne();

      periodsStats[period.key] = parseFloat(totalRevenue.total) || 0;
    }

    return {
      totalSales: {
        all: parseFloat(sum.total) || 0,
        ...periodsStats,
      },
    };
  }
}

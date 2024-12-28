import { Controller, Get } from '@nestjs/common';
import { Crud, CrudAuth, CrudController } from '@dataui/crud';
import { OrdersService } from './orders.service';
import { OrderEntity } from './order.entity';
import { saneOperationsId } from '../../common/swagger.config';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderProductsDetails } from './order-details.entity';
import { getPeriods } from '../../common/periods';
import { UserEntity } from '../users/entities/user.entity';
import { User } from '../auth/decorators/user.decorator';
import { UserRole } from '@core';

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
@CrudAuth({
  property: 'user',
  filter: (user: UserEntity) => {
    if (user.role === UserRole.SUPPLIER) {
      return {
        'products.product.supplier_id': user._id,
      };
    }
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

  private async getAdminStats(period?: { start: Date; end: Date }) {
    let query = `
    SELECT COALESCE(SUM(o."total"), 0) AS total_sales
    FROM orders o
  `;

    if (period) {
      query += `
      WHERE o."createdAt" >= '${period.start.toISOString()}'
        AND o."createdAt" <= '${period.end.toISOString()}'
    `;
    }

    const result = await this.orderRepository.query(query);
    return parseFloat(result[0].total_sales) || 0;
  }

  private async getSupplierStats(
    user: UserEntity,
    period?: { start: Date; end: Date }
  ) {
    let query = `
    SELECT COALESCE(SUM(od."soldPrice"), 0) AS total_sales
    FROM users u
    LEFT JOIN products p ON p.supplier_id = u._id
    JOIN order_details od ON od.product_id = p._id
    WHERE u._id = '${user._id}'
  `;

    if (period) {
      query += `
      AND od."createdAt" >= '${period.start.toISOString()}'
      AND od."createdAt" <= '${period.end.toISOString()}'
    `;
    }

    const result = await this.orderRepository.query(query);
    return parseFloat(result[0].total_sales) || 0;
  }

  @Get('/stats')
  @ApiResponse({
    status: 200,
    description: 'Get product statistics',
  })
  async stats(@User() user: UserEntity) {
    const periods = getPeriods();

    const all =
      user.role === UserRole.ADMIN
        ? await this.getAdminStats()
        : await this.getSupplierStats(user);

    const periodsStats = {};

    await Promise.all(
      periods.map(async (period) => {
        periodsStats[period.key] =
          user.role === UserRole.ADMIN
            ? await this.getAdminStats(period)
            : await this.getSupplierStats(user, period);
      })
    );

    return {
      totalSales: {
        all,
        ...periodsStats,
      },
    };
  }
}

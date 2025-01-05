import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController } from '@dataui/crud';
import { saneOperationsId } from '../../common/swagger.config';
import { MachineEntity } from './entities/machine.entity';
import { MachinesService } from './machines.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { UserRole } from '@core';
import { User } from '../auth/decorators/user.decorator';

const months = [
  { month: 1, abbreviation: 'Jan', label: 'January' },
  { month: 2, abbreviation: 'Feb', label: 'February' },
  { month: 3, abbreviation: 'Mar', label: 'March' },
  { month: 4, abbreviation: 'Apr', label: 'April' },
  { month: 5, abbreviation: 'May', label: 'May' },
  { month: 6, abbreviation: 'Jun', label: 'June' },
  { month: 7, abbreviation: 'Jul', label: 'July' },
  { month: 8, abbreviation: 'Aug', label: 'August' },
  { month: 9, abbreviation: 'Sep', label: 'September' },
  { month: 10, abbreviation: 'Oct', label: 'October' },
  { month: 11, abbreviation: 'Nov', label: 'November' },
  { month: 12, abbreviation: 'Dec', label: 'December' },
];

@Crud({
  model: {
    type: MachineEntity,
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
    limit: 10,

    join: {
      product: {
        alias: 'product',
        eager: true,
      },
      'product.product': {
        alias: 'singleProduct',
        eager: true,
      },
      'singleProduct.supplier': {
        exclude: ['password'],
        alias: 'product.product.supplier',
        eager: true,
      },
      orders: {
        alias: 'orders',
      },
      suppliers: {
        alias: 'suppliers',
        exclude: ['password'],
        eager: true,
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
  // if admin return everything, if supplier return the machines they have products in
  // or the products they created
  filter: (user: UserEntity) => {
    if (user.role === UserRole.ADMIN) return;

    // filter in array of suppliers id
    return {
      'singleProduct.supplier': user._id,
    };
  },
  persist: (user: UserEntity) => ({
    createdBy: user._id,
    // status:
    //   user.role === UserRole.ADMIN
    //     ? ProductStatus.ACTIVE
    //     : ProductStatus.PENDING,
  }),
})
@ApiBearerAuth('access-token')
@ApiResponse({ status: 403, description: 'Forbidden.' })
@ApiTags('machines')
@Controller('machines')
export class MachinesController implements CrudController<MachineEntity> {
  constructor(
    public service: MachinesService,
    @InjectRepository(MachineEntity)
    private readonly machinesRepository: Repository<MachineEntity>
  ) {}

  get base(): CrudController<MachineEntity> {
    return this;
  }

  private getUserStats(user: UserEntity) {
    return this.machinesRepository.query(`
      WITH months AS (
        SELECT
          generate_series(1, 12) AS month,
        to_char(to_date(generate_series(1, 12)::text, 'MM'), 'Mon') AS abbreviation,
        to_char(to_date(generate_series(1, 12)::text, 'MM'), 'Month') AS label
        )
      SELECT
        m.month,
        m.abbreviation,
        m.label,
        machine._id,
        machine.description,
        COALESCE(SUM(od."soldPrice"), 0) AS value,
        COUNT(o._id) AS totalOrders
      FROM
        months m
          LEFT JOIN orders o ON m.month = EXTRACT(MONTH FROM o."createdAt")
          LEFT JOIN order_details od ON od.order_id = o._id
          LEFT JOIN products p ON p._id = od.product_id
          LEFT JOIN users u ON u._id = p.supplier_id
          LEFT JOIN machines machine ON machine._id = o.machine_id
      WHERE
        u._id = '${user._id}'
      GROUP BY
        m.month, m.abbreviation, m.label, machine._id, machine.description
      ORDER BY
        m.month;
    `);
  }

  private getAdminStats() {
    return this.machinesRepository.query(`
      WITH months AS (
        SELECT
          generate_series(1, 12) AS month,
        to_char(to_date(generate_series(1, 12)::text, 'MM'), 'Mon') AS abbreviation,
        to_char(to_date(generate_series(1, 12)::text, 'MM'), 'Month') AS label
        )
      SELECT
        m.month,
        m.abbreviation,
        m.label,
        machine._id,
        machine.description,
        COALESCE(SUM(o."total"), 0) AS value
      FROM
        months m
        LEFT JOIN orders o ON m.month = EXTRACT(MONTH FROM o."createdAt")
        LEFT JOIN machines machine ON machine._id = o."machine_id"
      GROUP BY
        m.month, m.abbreviation, m.label, machine._id, machine.description
      ORDER BY
        m.month;
    `);
  }
  @Get('/stats')
  @ApiResponse({
    status: 200,
    description: 'Get machine statistics',
  })
  async stats(@User() user: UserEntity) {
    const rawData =
      user.role === UserRole.ADMIN
        ? await this.getAdminStats()
        : await this.getUserStats(user);

    const machines = {};

    rawData.forEach((row) => {
      if (!row._id) {
        return;
      }

      if (!machines[row._id]) {
        machines[row._id] = {
          _id: row._id,
          description: row.description,
          sumTotal: months.map((month) => ({
            ...month,
            value: 0,
          })),
        };
      }

      const machine = machines[row._id];
      const monthData = machine.sumTotal.find(
        (month) => month.month === row.month
      );
      if (monthData) {
        monthData.value = parseFloat(row.value);
      }
    });

    return {
      machines: Object.values(machines),
    };
  }
}

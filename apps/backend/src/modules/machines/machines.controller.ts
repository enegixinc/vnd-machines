import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController, CrudRequest } from '@dataui/crud';
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
        allow: ['_id'],
      },
      'product.product': {
        alias: 'singleProduct',
        eager: true,
        exclude: ['orders'],
      },
      'singleProduct.supplier': {
        exclude: ['password'],
        alias: 'product.product.supplier',
        allow: ['_id'],
        eager: true,
      },
      orders: {
        alias: 'orders',
      },
      suppliers: {
        alias: 'suppliers',
        allow: ['_id'],
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
  ) {
    console.log('MachinesController');
  }

  get base(): CrudController<MachineEntity> {
    console.log('MachinesController2');
    // @ts-expect-error - sad
    return this;
  }

  // @ts-expect-error - sad

  override async getManyBase(req: CrudRequest, @User() user: UserEntity) {
    console.log({ req, user });
    const response = await this.base.getManyBase(req);
    console.log({ response });
    return response;
  }

  private getUserStats(user: UserEntity) {
    console.log('MachinesController3');

    const currentYear = new Date().getFullYear(); // Get the current year

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
        u._id = '${user._id}' AND EXTRACT(YEAR FROM o."createdAt") = ${currentYear}  -- Filter by current year
      GROUP BY
        m.month, m.abbreviation, m.label, machine._id, machine.description
      ORDER BY
        m.month;
    `);
  }

  private getAdminStats() {
    const currentYear = new Date().getFullYear(); // Get the current year

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
    WHERE
      EXTRACT(YEAR FROM o."createdAt") = ${currentYear}  -- Filter by current year
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

  @Get('/machine-summary')
  @ApiResponse({
    status: 200,
    description: 'Get machine summary',
  })
  async machineSummary(
    @User() user: UserEntity,
    @Query('id') id: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    const startDateCondition = startDate
      ? `AND o."createdAt" >= '${startDate}'`
      : '';
    const endDateCondition = endDate ? `AND o."createdAt" <= '${endDate}'` : '';

    const rawData = await this.machinesRepository.query(`
      SELECT
        COUNT(od) AS totalOrders,
        (
          SELECT
            COALESCE(SUM(od."soldPrice"), 0)
          FROM
            ORDERS O
              JOIN MACHINES M ON M._ID = O.MACHINE_ID
              JOIN order_details od ON od.order_id = o._id
              join products p on p._id = od.product_id
              join users u on u._id = p.supplier_id
          WHERE
            u._id = '${user._id}'
          ${startDateCondition}
        ${endDateCondition}
        ) AS totalSales,


        (SELECT
           COALESCE(SUM(
                      CASE
                        WHEN C."feeType" = 'fixed' THEN COALESCE(C."feePerSale", 0)
                        WHEN C."feeType" = 'percentage' THEN COALESCE(OD."soldPrice" * (C."feePerSale" / 100), 0)
                        ELSE 0
                        END
                    ), 0)
         FROM
           orders AS O
             JOIN order_details AS OD ON OD.order_id = O._id
             JOIN products AS P ON P._id = OD.product_id
             JOIN users u on u._id = P.supplier_id
             JOIN contracts AS C ON C.supplier_id = P.supplier_id
             JOIN machines AS M ON M._id = O.machine_id
             AND C.status != 'terminated'
          ${startDateCondition}
          ${endDateCondition}
        ) AS totalRevenue


      FROM
        orders o
        JOIN order_details od ON od.order_id = o._id
        JOIN products p ON p._id = od.product_id
        JOIN users u ON u._id = p.supplier_id
    WHERE
      o.machine_id = '${id}'
      AND u._id = '${user._id}'
      ${startDateCondition}
      ${endDateCondition}
  `);

    return {
      totalOrders: parseInt(rawData[0].totalorders),
      totalSales: parseFloat(rawData[0].totalsales),
      totalRevenue: parseFloat(rawData[0].totalrevenue),
    };
  }

  @Get('/machines-stats')
  @ApiResponse({
    status: 200,
    description: 'Get machines statistics',
  })
  async machinesStats(@User() user: UserEntity) {
    return await this.machinesRepository.query(`
      SELECT
        machine._id,
        machine.description,
        COALESCE(SUM(od."soldPrice"), 0) AS totalSales,
        COUNT(o._id) AS totalOrders,
        (
          COALESCE(SUM(od."soldPrice"), 0) -     COALESCE(SUM(
                                                            CASE
                                                              WHEN c."feeType" = 'fixed' THEN COALESCE(c."feePerSale", 0)
                                                              WHEN c."feeType" = 'percentage' THEN COALESCE(od."soldPrice" * (c."feePerSale" / 100), 0)
                                                              ELSE 0
                                                              END
                                                          ), 0)
          ) AS totalRevenue

      FROM machines machine
             LEFT JOIN orders o ON machine._id = o.machine_id
             LEFT JOIN order_details od ON od.order_id = o._id
             LEFT JOIN products p ON p._id = od.product_id
             LEFT JOIN users u ON u._id = p.supplier_id
             LEFT JOIN contracts c ON c.supplier_id = p.supplier_id
        AND c.status != 'terminated' AND o."createdAt" BETWEEN c."startDate" AND c."endDate"

      WHERE
        u._id = '${user._id}'
      GROUP BY
        machine._id, machine.description
    `);
  }
}

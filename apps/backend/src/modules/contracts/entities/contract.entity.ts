import { Column, Entity, ManyToOne, OneToMany, VirtualColumn } from 'typeorm';
import { DatabaseEntity } from '../../../common/database.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { ContractStatus, FeeType, IContractEntity } from '@core';
import { IsDate, Validate } from 'class-validator';
import { IsStartDateValidConstraint } from '../validators/start-date';
import { FileEntity } from '../../files/file.entity';
import { PaymentsEntity } from '../../payments/payments.entity';
import { OrderEntity } from '../../orders/order.entity';

@Entity('contracts')
export class ContractEntity extends DatabaseEntity implements IContractEntity {
  @Column({ type: 'date', nullable: false })
  @IsDate()
  @Validate(IsStartDateValidConstraint)
  startDate: string;

  @Column({ type: 'date', nullable: false })
  @IsDate()
  endDate: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: ContractStatus,
    default: ContractStatus.ACTIVE,
  })
  status: ContractStatus;

  @Column({ type: 'numeric', nullable: false })
  feePerSale: number;

  @Column({ type: 'enum', enum: FeeType, nullable: false })
  feeType: FeeType;

  @ManyToOne(() => UserEntity, (user) => user.contracts, {})
  supplier: UserEntity;

  @OneToMany(() => PaymentsEntity, (payment) => payment.contract, {})
  payments: PaymentsEntity[];

  @Column({ nullable: true })
  supplier_id: string;

  @OneToMany(() => FileEntity, (file) => file.contract, { cascade: true })
  files: FileEntity[];

  // 1. Total Sales
  @VirtualColumn({
    type: 'numeric',
    query: (entity) => `
      SELECT
        COALESCE(SUM(OD."soldPrice"), 0)
      FROM
        orders AS O
        JOIN order_details AS OD ON OD.order_id = O._id
        JOIN products AS P ON P._id = OD.product_id
      WHERE
        O."createdAt" BETWEEN ${entity}."startDate" AND ${entity}."endDate"
        AND P."supplier_id" = ${entity}."supplier_id"
    `,
    transformer: {
      from: (value) => Number(value),
      to: (value) => value,
    },
  })
  totalSales: number;

  // 2. Total Revenue
  @VirtualColumn({
    type: 'numeric',
    query: (entity) => `
      SELECT
        COALESCE(SUM(
          CASE
            WHEN C."feeType" = 'fixed' THEN C."feePerSale"
            WHEN C."feeType" = 'percentage' THEN OD."soldPrice" * (C."feePerSale" / 100)
            ELSE 0
          END
        ), 0)
      FROM
        orders AS O
        JOIN order_details AS OD ON OD.order_id = O._id
        JOIN products AS P ON P._id = OD.product_id
        JOIN contracts AS C ON C.supplier_id = P.supplier_id
      WHERE
        O."createdAt" BETWEEN ${entity}."startDate" AND ${entity}."endDate"
        AND C._id = ${entity}._id
    `,
    transformer: {
      from: (value) => Number(value),
      to: (value) => value,
    },
  })
  totalRevenue: number;

  // 3. Total Due
  @VirtualColumn({
    type: 'numeric',
    query: (entity) => `
      WITH TotalRevenue AS (
        SELECT
          COALESCE(SUM(
                     CASE
                       WHEN C."feeType" = 'fixed' THEN C."feePerSale"
                       WHEN C."feeType" = 'percentage' THEN OD."soldPrice" * (C."feePerSale" / 100)
                       ELSE 0
                       END
                   ), 0) AS total_revenue
        FROM
          orders AS O
            JOIN order_details AS OD ON OD.order_id = O._id
            JOIN products AS P ON P._id = OD.product_id
            JOIN contracts AS C ON C.supplier_id = P.supplier_id
        WHERE
          O."createdAt" BETWEEN ${entity}."startDate" AND ${entity}."endDate"
          AND C._id = ${entity}._id
      ),
           TotalPayments AS (
             SELECT
               COALESCE(SUM(P.amount_paid), 0) AS total_paid
             FROM
               payments AS P
             WHERE
               P.contract_id = ${entity}._id
               AND P."createdAt" BETWEEN ${entity}."startDate" AND ${entity}."endDate"
           )
      SELECT
        (SELECT total_revenue FROM TotalRevenue) - (SELECT total_paid FROM TotalPayments) AS total_due
    `,
    transformer: {
      from: (value) => Number(value),
      to: (value) => value,
    },
  })
  totalDue: number;

  // 4. Active Revenue
  @VirtualColumn({
    type: 'numeric',
    query: (entity) => `
      WITH LastPayment AS (
        SELECT
          COALESCE(MAX(P.amount_paid), 0) AS last_payment
        FROM
          payments AS P
        WHERE
          P.contract_id = ${entity}._id
          AND P."createdAt" BETWEEN ${entity}."startDate" AND ${entity}."endDate"
      )
      SELECT
        COALESCE(SUM(
          CASE
            WHEN C."feeType" = 'fixed' THEN C."feePerSale"
            WHEN C."feeType" = 'percentage' THEN OD."soldPrice" * (C."feePerSale" / 100)
            ELSE 0
          END
        ), 0) - (SELECT last_payment FROM LastPayment) AS active_revenue
      FROM
        orders AS O
        JOIN order_details AS OD ON OD.order_id = O._id
        JOIN products AS P ON P._id = OD.product_id
        JOIN contracts AS C ON C.supplier_id = P.supplier_id
      WHERE
        O."createdAt" BETWEEN ${entity}."startDate" AND ${entity}."endDate"
        AND C._id = ${entity}._id
    `,
    transformer: {
      from: (value) => Number(value),
      to: (value) => value,
    },
  })
  activeRevenue: number;

  // 5. Total Paid in Contract
  @VirtualColumn({
    type: 'numeric',
    query: (entity) => `
      SELECT COALESCE(SUM(P.amount_paid), 0) AS total_paid
      FROM payments AS P
      WHERE
        P.contract_id = ${entity}._id
        AND P."createdAt" BETWEEN ${entity}."startDate" AND ${entity}."endDate"
    `,
    transformer: {
      from: (value) => Number(value),
      to: (value) => value,
    },
  })
  totalPaidInContract: number;

  // 6. Total Gain in Contract
  @VirtualColumn({
    type: 'numeric',
    query: (entity) => `
      SELECT COALESCE(SUM(P.amount_gained), 0) AS total_gain
      FROM payments AS P
      WHERE
        P.contract_id = ${entity}._id
        AND P."createdAt" BETWEEN ${entity}."startDate" AND ${entity}."endDate"
    `,
    transformer: {
      from: (value) => Number(value),
      to: (value) => value,
    },
  })
  totalGainInContract: number;

  // 7. Orders
  @VirtualColumn({
    type: 'array',
    query: (entity) => `
      SELECT COALESCE(jsonb_agg(orders), '[]'::jsonb)
      FROM contracts
      JOIN products ON contracts.supplier_id = products.supplier_id
      JOIN order_details ON products._id = order_details.product_id
      JOIN orders ON order_details.order_id = orders._id
      WHERE contracts._id = ${entity}._id
      AND orders."createdAt" >= contracts."startDate"
      AND orders."createdAt" <= contracts."endDate"
    `,
  })
  orders: OrderEntity[];

  // 8. Total Orders
  @VirtualColumn({
    type: 'numeric',
    query: (entity) => `
      SELECT
          COALESCE(COUNT(*), 0)
      FROM
          orders AS O
          JOIN order_details AS OD ON OD.order_id = O._id
          JOIN products AS P ON P._id = OD.product_id
          JOIN users AS SUPPLIER ON SUPPLIER._id = P.supplier_id
          JOIN contracts AS C ON C.supplier_id = SUPPLIER._id
      WHERE
          O."createdAt" BETWEEN ${entity}."startDate" AND ${entity}."endDate"
          AND C._id = ${entity}._id
    `,
  })
  totalOrders: number;
}

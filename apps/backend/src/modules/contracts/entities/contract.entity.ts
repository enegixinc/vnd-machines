import { Column, Entity, ManyToOne, VirtualColumn } from 'typeorm';
import { DatabaseEntity } from '../../../common/database.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { ContractStatus, FeeType, IContractEntity } from '@core';
import { IsDate, Validate } from 'class-validator';
import { IsStartDateValidConstraint } from '../validators/start-date';
import { FileDto } from '../../files/file.dto';
import { ApiProperty } from '@nestjs/swagger';
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
  @Column({ nullable: true })
  supplier_id: string;

  @Column('json', { nullable: true })
  @ApiProperty({ type: [FileDto] })
  files: FileDto[];

  @VirtualColumn({
    type: 'numeric',
    query: (entity) => `
        SELECT
            COALESCE(COUNT(*), 0)
        FROM
            ORDERS O
            JOIN ORDER_DETAILS OD ON OD.ORDER_ID = O._ID
            JOIN PRODUCTS P ON P._ID = OD.PRODUCT_ID
            JOIN USERS SUPPLIER ON SUPPLIER._ID = P.SUPPLIER_ID
            JOIN CONTRACTS C ON C.SUPPLIER_ID = SUPPLIER._ID
        WHERE
            C.STATUS = 'active'
            AND ${entity}."startDate" <= O."createdAt"
            AND O."createdAt" <= ${entity}."endDate"
        LIMIT 1
    `,
    transformer: {
      from: (value) => Number(value),
      to: (value) => value,
    },
  })
  totalOrders: number;

  @VirtualColumn({
    type: 'numeric',
    query: (entity) => `
        SELECT
            COALESCE(SUM(OD.quantity), 0)
        FROM
            ORDERS O
            JOIN ORDER_DETAILS OD ON OD.ORDER_ID = O._ID
            JOIN PRODUCTS P ON P._ID = OD.PRODUCT_ID
            JOIN USERS SUPPLIER ON SUPPLIER._ID = P.SUPPLIER_ID
            JOIN CONTRACTS C ON C.SUPPLIER_ID = SUPPLIER._ID
        WHERE
            C.STATUS = 'active'
            AND ${entity}."startDate" <= O."createdAt"
            AND O."createdAt" <= ${entity}."endDate"
        LIMIT 1
    `,
    transformer: {
      from: (value) => Number(value),
      to: (value) => value,
    },
  })
  totalSoldProducts: number;

  @VirtualColumn({
    type: 'numeric',
    query: (entity) => `
      SELECT
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
          JOIN contracts AS C ON C.supplier_id = P.supplier_id
      WHERE
        C."startDate" <= O."createdAt"
        AND O."createdAt" <= C."endDate"
        AND C._id = ${entity}._id
    `,
    transformer: {
      from: (value) => Number(value),
      to: (value) => value,
    },
  })
  totalRevenue: number;

  @VirtualColumn({
    type: 'numeric',
    query: (entity) => `
      SELECT
        COALESCE(SUM(OD."soldPrice"), 0)
      FROM
        orders AS O
          JOIN order_details AS OD ON OD.order_id = O._id
          JOIN products AS P ON P._id = OD.product_id
          JOIN contracts AS C ON C.supplier_id = P.supplier_id
      WHERE
        C._id = ${entity}._id
    `,
    transformer: {
      from: (value) => Number(value),
      to: (value) => value,
    },
  })
  totalSales: number;

  @VirtualColumn({
    type: 'array',
    query: (entity) => `
      select coalesce(jsonb_agg(orders), '[]'::jsonb)
      from contracts
             join products on contracts.supplier_id = products.supplier_id
             join order_details on products._id = order_details.product_id
             join orders on order_details.order_id = orders._id
      where contracts._id = ${entity}._id
        AND orders."createdAt" >= contracts."startDate"
        AND orders."createdAt" <= contracts."endDate"
    `,
  })
  orders: OrderEntity[];
}

import { Column, Entity, ManyToOne, VirtualColumn } from 'typeorm';
import { DatabaseEntity } from '../../../common/database.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { ContractStatus, FeeType, IContractEntity } from '@core';

@Entity('contracts')
export class ContractEntity extends DatabaseEntity implements IContractEntity {
  @Column({ type: 'date', nullable: false })
  startDate: string;

  @Column({ type: 'date', nullable: false })
  endDate: string;

  @Column({ type: 'varchar', nullable: false })
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
	          COALESCE(SUM(O.total), 0)
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
  totalRevenue: number;
  //
  // @TotalOrders('contract_id')

  // private get ordersInTime() {
  //   return getRecordsInBetweenTime(
  //     this.supplier?.orders ?? [],
  //     this.startDate,
  //     this.endDate
  //   );
  // }

  private get computedProfit() {
    const isPercentage = this.feeType === FeeType.PERCENTAGE;
    return (
      this.totalRevenue *
      (isPercentage ? this.feePerSale / 100 : this.feePerSale)
    );
  }
}
function getRecordsInBetweenTime<T extends DatabaseEntity>(
  records: T[],
  start: string,
  end: string
) {
  return records.filter((record) => {
    return record.createdAt >= start && record.createdAt <= end;
  });
}

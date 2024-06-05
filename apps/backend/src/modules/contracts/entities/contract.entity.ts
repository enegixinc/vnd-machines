import { AfterLoad, Column, Entity, ManyToOne } from 'typeorm';
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

  @Column({ type: 'numeric', nullable: false, default: 0 })
  totalSales: number;

  @Column({ type: 'numeric', nullable: false, default: 0 })
  totalRevenue: number;

  dueToSupplier: number;

  profit: number;

  @AfterLoad()
  calculateComputedFields() {
    this.totalSales = this.ordersInTime.length;
    this.totalRevenue = this.ordersInTime.reduce(
      (acc, order) => acc + order.soldPrice,
      0
    );
    this.profit = this.computedProfit;
  }

  private get ordersInTime() {
    return getRecordsInBetweenTime(
      this.supplier?.orders ?? [],
      this.startDate,
      this.endDate
    );
  }

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

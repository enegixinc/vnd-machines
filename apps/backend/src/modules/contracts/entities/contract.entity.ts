import {
  Column,
  Entity,
  EntitySubscriberInterface,
  EventSubscriber,
  OneToOne,
} from 'typeorm';
import { DatabaseEntity } from '../../../common/database.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { Post } from '@nestjs/common';
import {
  ContractStatus,
  FeeType,
  IContractEntity,
  IUserEntity,
  ReferenceByID,
} from '@core';

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

  @OneToOne(() => UserEntity, (supplier) => supplier.contract)
  supplier: ReferenceByID<IUserEntity>;

  // @Column({ type: 'boolean', default: false })
  // autoRenew: boolean;

  @Column({ type: 'numeric', nullable: false, default: 0 })
  totalSales: number;

  @Column({ type: 'numeric', nullable: false, default: 0 })
  totalRevenue: number;
}

@EventSubscriber()
export class PostSubscriber implements EntitySubscriberInterface {
  listenTo() {
    return Post;
  }
  //
  // async afterInsert(event: InsertEvent<ContractEntity>) {
  //   await event.queryRunner.startTransaction();
  //   try {
  //     await event.queryRunner.manager.increment(
  //       UserEntity,
  //       { id: event.entity.supplier.id },
  //       'totalContracts',
  //       1
  //     );
  //     await event.queryRunner.commitTransaction();
  //   } catch (error) {
  //     await event.queryRunner.rollbackTransaction();
  //   } finally {
  //     await event.queryRunner.release();
  //   }
  // }
}

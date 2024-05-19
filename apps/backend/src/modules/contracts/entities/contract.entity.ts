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

enum ContractStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  TERMINATED = 'terminated',
}

@Entity('contracts')
export class ContractEntity extends DatabaseEntity {
  @Column({ type: 'date', nullable: false })
  startDate: Date;

  @Column({ type: 'date', nullable: false })
  endDate: Date;

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

  @OneToOne(() => UserEntity, (supplier) => supplier.contract)
  supplier: UserEntity;

  @Column({ type: 'boolean', default: false })
  autoRenew: boolean;

  @Column({ type: 'numeric', nullable: false })
  totalSales: number;

  @Column({ type: 'numeric', nullable: false })
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

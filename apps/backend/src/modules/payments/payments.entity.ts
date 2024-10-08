import { DatabaseEntity } from '../../common/database.entity';
import { ContractEntity } from '../contracts/entities/contract.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';

@Entity('payments')
export class PaymentsEntity extends DatabaseEntity {
  @PrimaryGeneratedColumn()
  payment_id: number;

  @ManyToOne(() => ContractEntity, (contract) => contract.payments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  contract: ContractEntity;

  @OneToMany(() => UserEntity, (user) => user.payments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  supplier_id: UserEntity;

  @Column('numeric', { nullable: false })
  amount_paid: number;

  @Column('date', { nullable: false })
  payment_date: Date;
}

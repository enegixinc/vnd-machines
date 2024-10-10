import { DatabaseEntity } from '../../common/database.entity';
import { ContractEntity } from '../contracts/entities/contract.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';

@Entity('payments')
export class PaymentsEntity extends DatabaseEntity {
  @ManyToOne(() => ContractEntity, (contract) => contract.payments, {
    onDelete: 'CASCADE',
  })
  contract: ContractEntity;
  @Column({ nullable: true })
  contract_id: string;
  @ManyToOne(() => UserEntity, (user) => user.payments, {
    onDelete: 'CASCADE',
  })
  supplier: UserEntity;
  @Column({ nullable: true })
  supplier_id: string;
  @Column('numeric', { nullable: false })
  amount_paid: number;
}

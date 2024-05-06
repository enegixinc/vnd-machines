import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { IUserEntity, POLICY, UserRole } from '@core';
import { DatabaseEntity } from '../../../common/database.entity';
import { ProductEntity } from '../../products/product.entity';

@Entity('users')
export class UserEntity extends DatabaseEntity implements IUserEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  lastName: string;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({ type: 'varchar', length: 32, nullable: true })
  businessName: string;

  @Column({
    type: 'varchar',
    length: POLICY.AUTH.PASSWORD.MAX_LENGTH,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.SUPPLIER,
  })
  role: UserRole;

  @Column({ type: 'varchar', length: 20, unique: true })
  phoneNumber: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @ManyToMany(() => ProductEntity, (product) => product.suppliers)
  @JoinTable({
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'productId',
      referencedColumnName: '_id',
    },
  })
  products: string[];
  documents: string[];
}

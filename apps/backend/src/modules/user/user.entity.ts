import { Column, Entity, ManyToMany } from 'typeorm';
import { IProduct, IUser, UserRole } from '@core';
import { ProductEntity } from '../product/product.entity';
import { DatabaseEntity } from '../../common/database.entity';

@Entity()
export class UserEntity extends DatabaseEntity implements IUser {
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    enum: UserRole,
    default: UserRole.SUPPLIER,
  })
  role: UserRole;

  @ManyToMany(() => ProductEntity, (product) => product.supplierId)
  products: IProduct[];
}

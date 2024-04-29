import { Column, Entity } from 'typeorm';
import { IUser, UserRole } from '@core';
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
    type: 'enum',
    enum: UserRole,
    default: UserRole.SUPPLIER,
  })
  role: UserRole;

  // @ManyToMany(() => ProductEntitsy, (product) => product.supplierId)
  // products: IProduct[];
}

import { BeforeInsert, Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { IUserEntity, UserRole } from '@core';
import { DatabaseEntity } from '../../../common/database.entity';
import { ProductEntity } from '../../products/product.entity';
import { CategoryEntity } from '../../categories/category.entity';
import { BrandEntity } from '../../brands/brand.entity';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class UserEntity extends DatabaseEntity implements IUserEntity {
  @BeforeInsert()
  async hashingPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

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
      referencedColumnName: '_id',
    },
    inverseJoinColumn: {
      name: 'productId',
      referencedColumnName: '_id',
    },
  })
  products: string[];

  @ManyToMany(() => BrandEntity, (brand) => brand.suppliers)
  brands: string[];

  @ManyToMany(() => CategoryEntity, (category) => category.suppliers)
  categories: string[];

  documents: string[];
}

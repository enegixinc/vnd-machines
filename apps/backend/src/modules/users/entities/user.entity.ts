import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { IUserEntity, UserRole } from '@core';
import { Factory } from 'nestjs-seeder';
import bcrypt from 'bcrypt';

import { DatabaseEntity } from '../../../common/database.entity';
import { ProductEntity } from '../../products/product.entity';
import { CategoryEntity } from '../../categories/category.entity';
import { BrandEntity } from '../../brands/brand.entity';
import { ContractEntity } from '../../contracts/entities/contract.entity';
import {
  TotalOrders,
  TotalRevenue,
  TotalSales,
} from '../../categories/decorators';

@Entity('users')
export class UserEntity extends DatabaseEntity implements IUserEntity {
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @TotalSales('supplier_id')
  totalSales: number;

  @TotalRevenue('supplier_id')
  totalRevenue: number;

  @TotalOrders('supplier_id')
  totalOrders: number;

  @Factory((faker) => faker.person.fullName())
  @Column({ type: 'varchar', length: 100, nullable: false })
  firstName: string;

  @Factory((faker) => faker.person.lastName())
  @Column({ type: 'varchar', length: 100, nullable: false })
  lastName: string;

  @Factory((faker) => faker.internet.email())
  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Factory((faker) => faker.company.name().slice(0, 32))
  @Column({ type: 'varchar', length: 32, nullable: true })
  businessName: string;

  @Factory((faker) => faker.internet.password())
  @Column({
    type: 'varchar',
  })
  password: string;

  @Factory((faker) => faker.helpers.enumValue(UserRole))
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.SUPPLIER,
  })
  role: UserRole;

  @Factory((faker) => faker.phone.number())
  @Column({ type: 'varchar', unique: true })
  phoneNumber: string;

  @Factory((faker) => faker.datatype.boolean())
  @Column({ type: 'boolean', default: true })
  active: boolean;

  @OneToMany(() => ProductEntity, (product) => product.supplier)
  products: string[];

  @ManyToMany(() => BrandEntity, (brand) => brand.suppliers)
  brands: string[];

  @ManyToMany(() => CategoryEntity, (category) => category.suppliers)
  categories: string[];

  @OneToMany(() => ContractEntity, (contract) => contract.supplier, {
    cascade: ['insert', 'update', 'recover', 'remove', 'soft-remove'],
  })
  @JoinColumn()
  contracts: ContractEntity[];

  // @OneToMany(() => OrderEntity, (order) => order.supplier, {
  //   eager: true,
  // })
  // orders: OrderProductsDetails[];

  documents: string[];
}

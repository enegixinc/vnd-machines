import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { IUserEntity, UserRole } from '@core';
import { Factory } from 'nestjs-seeder';
import bcrypt from 'bcrypt';

import {
  DatabaseEntity,
  SearchableEntity,
} from '../../../common/database.entity';
import { ProductEntity } from '../../products/entities/product.entity';
import { CategoryEntity } from '../../categories/category.entity';
import { BrandEntity } from '../../brands/brand.entity';
import { ContractEntity } from '../../contracts/entities/contract.entity';
import {
  TotalOrders,
  TotalRevenue,
  TotalSoldProducts,
} from '../../categories/decorators';
import { MultiLangEntity } from '../../products/entities/multiLang.entity';

@Entity('users')
export class UserEntity extends SearchableEntity implements IUserEntity {
  @BeforeInsert()
  @BeforeUpdate()
  handleSearchableFields() {
    this.searchableText = MultiLangEntity.handleSearchableText([
      this.firstName,
      this.lastName,
      this.businessName,
      this.email,
      this.phoneNumber,
    ]);

    this.fullName = this.firstName + ' ' + this.lastName;
  }

  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @TotalSoldProducts('users', 'supplier_id')
  totalSoldProducts: number;

  @TotalRevenue('users', 'supplier_id')
  totalRevenue: number;

  @TotalOrders('users', 'supplier_id')
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

  @OneToMany(() => ProductEntity, (product) => product.supplier, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
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

  // @OneToMany(() => FillRequestEntity, (request) => request.supplier)
  // fillRequests: FillRequestEntity[];

  documents: string[];

  // @TotalSoldProducts('supplier_id')
  // totalSoldProducts: number;
}

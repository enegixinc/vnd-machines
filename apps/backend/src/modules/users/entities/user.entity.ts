import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  VirtualColumn,
} from 'typeorm';
import { IUserEntity, UserRole } from '@core';
import { Factory } from 'nestjs-seeder';
import bcrypt from 'bcrypt';

import { SearchableEntity } from '../../../common/database.entity';
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
import { OrderEntity } from '../../orders/order.entity';

@Entity('users')
export class UserEntity extends SearchableEntity implements IUserEntity {
  @BeforeUpdate()
  @BeforeInsert()
  handleProducts() {
    console.log(this);
    if (!this.products) return;
    // @ts-ignore
    this.products = this.products.map((product) => product._id);
  }

  @BeforeInsert()
  @BeforeUpdate()
  handleSearchableFields() {
    this.searchableText = MultiLangEntity.handleSearchableText([
      this._id,
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
    if (!this.password) return;
    this.password = await bcrypt.hash(this.password, 10);
  }

  @VirtualColumn({
    type: 'array',
    query: (entity) => `
      select coalesce(jsonb_agg(orders), '[]'::jsonb)
      from users
             join products on users._id = products.supplier_id
             join order_details on products._id = order_details.product_id
             join orders on order_details.order_id = orders._id
      where users._id = ${entity}._id
    `,
  })
  orders: OrderEntity[];

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
  @Column({ type: 'varchar', unique: true, nullable: true })
  phoneNumber: string;

  @Factory((faker) => faker.datatype.boolean())
  @Column({ type: 'boolean', default: true })
  active: boolean;

  @OneToMany(() => ProductEntity, (product) => product.supplier, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: ['update'],
  })
  products: ProductEntity[];

  // @ManyToMany(() => BrandEntity, (brand) => brand.suppliers)
  @VirtualColumn({
    type: 'array',
    query: (entity) => `
      select coalesce(jsonb_agg(brands), '[]'::jsonb)
      from users
             join products on users._id = products.supplier_id
             join brands on products.brand_id = brands._id
      where users._id = ${entity}._id
    `,
  })
  brands: BrandEntity[];

  // @ManyToMany(() => CategoryEntity, (category) => category.suppliers)
  @VirtualColumn({
    type: 'array',
    query: (entity) => `
      select coalesce(jsonb_agg(categories), '[]'::jsonb)
      from users
             join products on users._id = products.supplier_id
             join categories on products.category_id = categories._id
      where users._id = ${entity}._id
    `,
  })
  categories: CategoryEntity[];

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

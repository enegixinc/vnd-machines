import { Column, Entity, ManyToOne } from 'typeorm';
import { DatabaseEntity } from '../../common/database.entity';
import { ProductEntity } from '../products/product.entity';
import { OrderEntity } from './orders.entity';
import { UserEntity } from '../users/entities/user.entity';
import { CategoryEntity } from '../categories/category.entity';
import { BrandEntity } from '../brands/brand.entity';

@Entity('orders_products')
export class OrderProduct extends DatabaseEntity {
  @Column({
    type: 'int',
  })
  quantity: number;

  @Column({
    type: 'numeric',
  })
  discount: number;

  @Column({
    type: 'boolean',
  })
  proposed: boolean;

  @Column({
    type: 'varchar',
  })
  lane: string;

  @Column({
    type: 'varchar',
  })
  row_number: string;

  @Column({
    type: 'varchar',
    default: '',
  })
  snapshot_name: string;

  @Column({
    type: 'numeric',
  })
  soldPrice: number;

  @Column({
    type: 'numeric',
  })
  tax_amount: number;

  @Column({
    type: 'numeric',
  })
  retail_price: number;

  @ManyToOne(() => OrderEntity, (order) => order.products, {
    eager: true,
  })
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orders, {
    eager: true,
  })
  product: ProductEntity;

  @ManyToOne(() => UserEntity, (supplier) => supplier.products, {
    eager: true,
  })
  supplier: UserEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    eager: true,
  })
  category: CategoryEntity;

  @ManyToOne(() => BrandEntity, (brand) => brand.products, {
    eager: true,
  })
  brand: BrandEntity;
}

import { Column, Entity, ManyToOne } from 'typeorm';
import { DatabaseEntity } from '../../common/database.entity';
import { ProductEntity } from '../products/product.entity';
import { OrderEntity } from './orders.entity';

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
}

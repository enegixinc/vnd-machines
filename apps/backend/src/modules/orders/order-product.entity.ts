import { Column, Entity, ManyToOne } from 'typeorm';
import { DatabaseEntity } from '../../common/database.entity';
import { ProductEntity } from '../products/product.entity';
import { OrderEntity } from './orders.entity';

@Entity('orders_products')
export class OrderProduct extends DatabaseEntity {
  @Column()
  quantity: number;

  @Column()
  discount: number;

  @ManyToOne(() => OrderEntity, (order) => order.products)
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orders)
  product: ProductEntity;
}

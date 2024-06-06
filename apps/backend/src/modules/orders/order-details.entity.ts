import { Column, Entity, ManyToOne } from 'typeorm';
import { DatabaseEntity } from '../../common/database.entity';
import { OrderEntity } from './orders.entity';
import { ProductEntity } from '../products/product.entity';

@Entity('order_details')
export class OrderProductsDetails extends DatabaseEntity {
  @Column({
    type: 'int',
  })
  quantity: number;

  @Column({
    type: 'numeric',
  })
  // TODO: ask client to clarify what this field is
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
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orders, {
    eager: true,
    cascade: false,
    nullable: true,
  })
  product: ProductEntity;
}

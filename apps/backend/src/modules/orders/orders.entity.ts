import { Column, Entity, OneToMany } from 'typeorm';
import { MagexDatabaseEntity } from '../../common/database.entity';
import { MagexService } from '../../services/magex/magex.service';
import { ApiProperty } from '@nestjs/swagger';
import { ProductEntity } from '../products/product.entity';
import { OrderProduct } from './order-product.entity';

// @Entity()
// class Machine {
//   @ApiProperty({ type: String })
//   @ObjectIdColumn()
//   _id: string;
//
//   @ApiProperty({ type: String })
//   @Column()
//   name: string;
//
//   @ApiProperty({ type: String })
//   @Column()
//   description: string;
// }

@Entity('orders')
export class OrderEntity extends MagexDatabaseEntity {
  @ApiProperty({ type: String })
  @Column()
  status: string;

  @ApiProperty({ type: String })
  @Column()
  payment_type: string;

  @ApiProperty({ type: String })
  @Column()
  lang: string;

  // @ApiProperty({ type: Machine })
  // @Column((type) => Machine)
  // machineID: Machine;
  //
  @ApiProperty({ type: [ProductEntity] })
  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {
    cascade: true,
  })
  products: ProductEntity[];

  @ApiProperty({ type: String })
  @Column()
  referTo: string;

  @ApiProperty({ type: Number })
  @Column({
    type: 'numeric',
  })
  tax: number;

  @ApiProperty({ type: Number })
  @Column({
    type: 'numeric',
  })
  total: number;

  @ApiProperty({ type: String })
  @Column()
  currency: string;

  @ApiProperty({ type: String })
  @Column()
  createdAtUtc: Date;

  @ApiProperty({ type: Number })
  @Column({
    type: 'numeric',
  })
  utcOffset: number;

  @ApiProperty({ type: String })
  @Column()
  payment_transaction_id: string;

  @ApiProperty({ type: String })
  @Column()
  payment_receipt: string;

  @ApiProperty({ type: String })
  @Column()
  cart_number: string;

  @ApiProperty({ type: String })
  @Column()
  card_number: string;

  @ApiProperty({ type: String })
  @Column()
  card_department: string;

  @ApiProperty({ type: String })
  @Column()
  email: string;

  @ApiProperty({ type: String })
  @Column()
  reservation_code: string;

  @ApiProperty({ type: String })
  @Column()
  return_code: string;

  createMagexRecord(magexService: MagexService): Promise<void> {
    return Promise.resolve(undefined);
  }

  deleteMagexRecord(magexService: MagexService): Promise<void> {
    return Promise.resolve(undefined);
  }

  async fetchMagexRecords(magexService: MagexService): Promise<OrderEntity[]> {
    return (await magexService.orders.postOrders({
      requestBody: {
        start: new Date('0').toISOString(),
        end: new Date().toISOString(),
        id: 'tryvnd@point24h.com',
        ids: '657ab833c7201f469894300d,657ab86ec7201f469894300f',
      },
    })) as Promise<OrderEntity[]>;
  }

  updateMagexRecord(magexService: MagexService): Promise<void> {
    return Promise.resolve(undefined);
  }
}

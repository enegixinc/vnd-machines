import { MagexDatabaseEntity } from '../../../common/database.entity';
import { MagexService } from '../../../services/magex/magex.service';
import { MachinesEndpointResponse } from '../../../../../../libs/core/src/interfaces/machine';
import { Column, Entity, OneToMany, VirtualColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { MachineProduct } from './machine-product.entity';
import { OrderEntity } from '../../orders/order.entity';

@Entity('machines')
export class MachineEntity extends MagexDatabaseEntity {
  @VirtualColumn({
    type: 'int',
    query: (entity) => `
        SELECT
            COALESCE(SUM(O.total), 0)
        FROM
            ORDERS O
            JOIN MACHINES M ON M._ID = O.MACHINE_ID
        WHERE
            M._id = ${entity}._id
    `,
    transformer: {
      from: (value) => Number(value),
      to: (value) => value,
    },
  })
  totalRevenue: number;

  @VirtualColumn({
    type: 'int',
    query: (entity) => `
        SELECT
            COALESCE(SUM(OD.quantity), 0)
        FROM
            ORDERS O
            JOIN MACHINES M ON M._ID = O.MACHINE_ID
            JOIN ORDER_DETAILS OD ON OD.ORDER_ID = O._ID
        WHERE
            M._id = ${entity}._id
    `,
    transformer: {
      from: (value) => Number(value),
      to: (value) => value,
    },
  })
  totalSoldProducts: number;

  @VirtualColumn({
    type: 'int',
    query: (entity) => `
        SELECT
            COALESCE(COUNT(*), 0)
        FROM
            ORDERS O
            JOIN MACHINES M ON M._ID = O.MACHINE_ID
        WHERE
            M._id = ${entity}._id
    `,
    transformer: {
      from: (value) => Number(value),
      to: (value) => value,
    },
  })
  totalOrders: number;

  @ApiProperty({ type: () => [MachineProduct] })
  @OneToMany(() => MachineProduct, (machineProduct) => machineProduct.machine, {
    cascade: true,
  })
  product: MachineProduct[];

  @ApiProperty({ type: () => [OrderEntity] })
  @OneToMany(() => OrderEntity, (order) => order.machine, {})
  orders: OrderEntity[];

  @ApiProperty()
  @Column()
  status: boolean;

  @ApiProperty()
  @Column()
  alertSent: boolean;

  @ApiProperty()
  @Column()
  machineOnline: boolean;

  @ApiProperty()
  @Column()
  machineOnlineAlert: boolean;

  @ApiProperty()
  @Column('simple-array')
  category: string[];

  @ApiProperty()
  @Column('simple-array')
  brand: string[];

  @ApiProperty()
  @Column('simple-array')
  products_bs: string[];

  @ApiProperty()
  @Column()
  tax: number;

  @ApiProperty()
  @Column('simple-array')
  group: string[];

  @ApiProperty()
  @Column()
  stock: number;

  @ApiProperty()
  @Column()
  time_to_idle: number;

  @ApiProperty()
  @Column()
  enablePriceChange: boolean;

  @ApiProperty()
  @Column()
  alertEmail: string;

  @ApiProperty()
  @Column()
  alertEmail2: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  belongTo: string;

  @ApiProperty({
    type: 'number',
    example: 3,
  })
  @Column({
    type: 'int',
  })
  lane: number;

  @ApiProperty({
    type: 'number',
    example: 3,
  })
  @Column({
    type: 'int',
  })
  floor: number;

  @ApiProperty({
    type: 'number',
    example: 7.8,
  })
  @Column({
    type: 'numeric',
  })
  laneLength: number;

  @ApiProperty({
    type: 'number',
    example: 7.8,
  })
  @Column({
    type: 'numeric',
  })
  height: number;

  @ApiProperty({
    type: 'number',
    example: 7.8,
  })
  @Column({
    type: 'numeric',
  })
  slot_height: number;

  @ApiProperty({
    type: 'number',
    example: 7.8,
  })
  @Column({
    type: 'numeric',
  })
  step_depth: number;

  @ApiProperty({
    type: 'number',
    example: 7.8,
  })
  @Column({
    type: 'numeric',
  })
  step_num: number;

  @ApiProperty()
  @Column()
  model: string;

  // @ApiProperty({ type: () => Tz })
  // @ManyToOne(() => Tz, { cascade: true, eager: true })
  // tz: Tz;
  //
  // @ApiProperty({ type: () => ThemeColor })
  // @ManyToOne(() => ThemeColor, { cascade: true, eager: true })
  // themeColor: ThemeColor;
  //
  //
  // @ApiProperty({ type: () => Currency })
  // @ManyToOne(() => Currency, { cascade: true, eager: true })
  // currency: Currency;
  //
  // @ApiProperty({ type: () => [Language] })
  // @OneToMany(() => Language, (language) => language.id, { cascade: true, eager: true })
  // @JoinTable()
  // languages: Language[];
  //
  // @ApiProperty({ type: () => [ProductsMin] })
  // @OneToMany(() => ProductsMin, (productsMin) => productsMin.id, {
  //   cascade: true,
  //   eager: true,
  // })
  // @JoinTable()
  // products_min: ProductsMin[];

  @ApiProperty()
  @Column('simple-array')
  products_price: string[];

  @ApiProperty()
  @Column('simple-array')
  products_plan: string[];

  @ApiProperty()
  @Column()
  stocking: string;

  @ApiProperty()
  @Column()
  active: Date;

  @ApiProperty()
  @Column()
  gui_version: string;

  @ApiProperty()
  @Column()
  master_version: string;

  @ApiProperty()
  @Column()
  diff: boolean;

  @ApiProperty()
  @Column()
  screenSaver: string;

  createMagexRecord(magexService: MagexService): Promise<void> {
    return Promise.resolve(undefined);
  }

  deleteMagexRecord(magexService: MagexService): Promise<void> {
    return Promise.resolve(undefined);
  }

  async fetchMagexRecords(magexService: MagexService) {
    const response =
      (await magexService.machines.getGroupsAndMachinesByAccountName({
        accountName: 'tryvnd@point24h.com',
      })) as MachinesEndpointResponse;

    return response.machines;
  }

  updateMagexRecord(magexService: MagexService): Promise<void> {
    return Promise.resolve(undefined);
  }
}

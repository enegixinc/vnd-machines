import { DatabaseEntity } from '../../common/database.entity';
import {
  Language,
  Machine,
  MagexCurrency,
  Product,
  ProductsMin,
  ThemeColor,
  Tz,
} from '../../../../../libs/core/src/interfaces/machine';
import { Column, JoinTable, ManyToMany } from 'typeorm';
import { decorate } from 'ts-mixer';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { BrandEntity } from '../brands/brand.entity';
import { CategoryEntity } from '../categories/category.entity';

export class MachineEntity extends DatabaseEntity implements Machine {
  @decorate(
    Column({
      type: 'timestamp',
      nullable: true,
    })
  )
  @decorate(
    ApiProperty({
      example: '2021-07-01T00:00:00.000Z',
      type: 'date',
      nullable: true,
    })
  )
  active: string;

  @decorate(
    Column({
      type: 'varchar',
      nullable: true,
    })
  )
  @decorate(
    ApiProperty({
      example: 'email@example.com',
      type: 'string',
      nullable: true,
    })
  )
  alertEmail: string;

  @decorate(
    Column({
      type: 'varchar',
      nullable: true,
    })
  )
  @decorate(
    ApiProperty({
      example: 'email@example.com',
      type: 'string',
      nullable: true,
    })
  )
  alertEmail2: string;

  @decorate(
    Column({
      type: 'boolean',
      default: false,
    })
  )
  @decorate(
    ApiProperty({
      example: false,
      type: 'boolean',
    })
  )
  alertSent: boolean;

  @decorate(
    Column({
      type: 'varchar',
    })
  )
  @decorate(
    ApiProperty({
      type: 'string',
      example: 'email@example.com',
    })
  )
  belongTo: string;

  @ManyToMany(() => BrandEntity, (brand) => brand.machines, {
    nullable: true,
    eager: true,
  })
  @JoinTable({
    joinColumn: {
      name: 'machineId',
      referencedColumnName: '_id',
    },
    inverseJoinColumn: {
      name: 'brandId',
      referencedColumnName: '_id',
    },
  })
  @decorate(
    ApiProperty({
      type: () => {
        PickType(BrandEntity, ['_id']);
      },
    })
  )
  brand: any[];

  @ManyToMany(() => CategoryEntity, (category) => category.machines, {
    nullable: true,
    eager: true,
  })
  @JoinTable({
    joinColumn: {
      name: 'machineId',
      referencedColumnName: '_id',
    },
    inverseJoinColumn: {
      name: 'categoryId',
      referencedColumnName: '_id',
    },
  })
  @decorate(
    ApiProperty({
      type: () => {
        PickType(CategoryEntity, ['_id']);
      },
    })
  )
  category: any[];

  @decorate(
    Column({
      type: 'jsonb',
    })
  )
  @decorate(
    ApiProperty({
      type: 'object',
    })
  )
  currency: MagexCurrency;

  @decorate(
    Column({
      type: 'string',
      nullable: true,
    })
  )
  @decorate(
    ApiProperty({
      type: 'string',
      nullable: true,
    })
  )
  description: string;

  @decorate(
    Column({
      type: 'boolean',
      default: false,
    })
  )
  @decorate(
    ApiProperty({
      type: 'boolean',
      default: false,
    })
  )
  diff: boolean;

  @decorate(
    Column({
      type: 'int',
    })
  )
  @decorate(
    ApiProperty({
      type: 'number',
    })
  )
  enablePriceChange: boolean;

  @decorate(
    Column({
      type: 'int',
    })
  )
  @decorate(
    ApiProperty({
      type: 'number',
    })
  )
  floor: number;

  @decorate(
    Column({
      type: 'array',
    })
  )
  @decorate(
    ApiProperty({
      type: 'array',
    })
  )
  group: any[];

  @decorate(
    Column({
      type: 'int',
    })
  )
  @decorate(
    ApiProperty({
      type: 'number',
    })
  )
  gui_version: string;

  @decorate(
    Column({
      type: 'int',
    })
  )
  @decorate(
    ApiProperty({
      type: 'number',
    })
  )
  height: number;

  @decorate(
    Column({
      type: 'int',
    })
  )
  @decorate(
    ApiProperty({
      type: 'number',
    })
  )
  lane: number;

  @decorate(
    Column({
      type: 'int',
    })
  )
  @decorate(
    ApiProperty({
      type: 'number',
    })
  )
  laneLength: number;

  @decorate(
    Column({
      type: 'array',
    })
  )
  @decorate(
    ApiProperty({
      type: 'array',
    })
  )
  languages: Language[];

  @decorate(
    Column({
      type: 'boolean',
    })
  )
  @decorate(
    ApiProperty({
      type: 'boolean',
    })
  )
  machineOnline: boolean;

  @decorate(
    Column({
      type: 'boolean',
    })
  )
  @decorate(
    ApiProperty({
      type: 'boolean',
    })
  )
  machineOnlineAlert: boolean;

  @decorate(
    Column({
      type: 'int',
    })
  )
  @decorate(
    ApiProperty({
      type: 'number',
    })
  )
  master_version: string;

  @decorate(
    Column({
      type: 'string',
    })
  )
  @decorate(
    ApiProperty({
      type: 'string',
    })
  )
  model: string;

  @decorate(
    Column({
      type: 'string',
    })
  )
  @decorate(
    ApiProperty({
      type: 'string',
    })
  )
  name: string;

  product: Product[];
  products_bs: any[];
  products_min: ProductsMin[];
  products_plan: any[];
  products_price: any[];
  screenSaver: string;
  slot_height: number;
  status: boolean;
  step_depth: number;
  step_num: number;
  stock: number;
  stocking: string;
  tax: number;
  themeColor: ThemeColor;
  time_to_idle: number;
  tz: Tz;
}

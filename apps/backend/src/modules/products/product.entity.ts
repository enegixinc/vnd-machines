import { Column, Entity, ManyToMany } from 'typeorm';
import {
  Dimension,
  ICategory,
  IProductEntity,
  ISerializedBrand,
  ISerializedUser,
  MultiLang,
  ReferenceByID,
} from '@core';
import { ManualDatabaseEntity } from '../../common/database.entity';

@Entity('categories')
export class ProductEntity
  extends ManualDatabaseEntity
  implements IProductEntity
{
  @Column({ type: 'varchar', nullable: true })
  upc: string;

  @ManyToMany(() => ProductEntity, (product) => product.category, {
    nullable: true,
    eager: true,
  })
  suppliers: ReferenceByID<ISerializedUser>[];

  @Column({ type: 'integer' })
  __v: number;

  @Column({ type: 'numeric' })
  additionPrice: any;

  @Column({ type: 'integer' })
  ageControl: number;

  @Column({ type: 'jsonb' })
  name: MultiLang;

  @Column({ type: 'varchar' })
  barcode: string;

  @Column({ type: 'varchar' })
  brand: ReferenceByID<ISerializedBrand>;

  @Column('simple-array')
  category: ICategory[];

  @Column({ type: 'numeric' })
  costPrice: any;

  @Column('jsonb')
  description: MultiLang;

  @Column('jsonb')
  detail: MultiLang;

  @Column('jsonb')
  include: MultiLang;

  @Column('jsonb')
  ingredients: MultiLang;

  @Column('jsonb')
  keyFeatures: MultiLang;

  @Column('jsonb')
  specification: MultiLang;

  @Column('jsonb')
  dimension: Dimension;

  @Column({ type: 'numeric' })
  price: number;

  @Column({ type: 'boolean' })
  pricePerKilo: boolean;

  @Column({ type: 'varchar' })
  prodType: string;

  @Column('simple-array')
  productPictures: string[];

  @Column({ type: 'varchar' })
  productVideo: string;

  @Column({ type: 'varchar' })
  referTo: string;

  @Column({ type: 'integer' })
  sortIndex: number;

  @Column({ type: 'integer' })
  vatIndex: number;

  @Column({ type: 'integer' })
  virtualProduct: number;

  // @DeleteDateColumn()
  // @ApiProperty({
  //   example: '2024-05-01T12:00:00.000Z',
  //   description: 'Creation date of the product',
  //   type: String,
  // })
  // deletedAt: string;

  @Column({ type: 'timestamp' })
  lastSync: string;
}

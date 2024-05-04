import { BeforeInsert, Column, Entity, ManyToMany } from 'typeorm';
import {
  Brand,
  Category,
  Dimension,
  IProduct,
  ISerializedUser,
  MultiLang,
} from '@core';
import { UserEntity } from '../user/user.entity';
import { ManualDatabaseEntity } from '../../common/database.entity';

@Entity('products')
export class ProductEntity extends ManualDatabaseEntity implements IProduct {
  @Column({ type: 'varchar', nullable: true })
  upc: string;

  @ManyToMany(() => UserEntity, (user) => user.products, {
    nullable: true,
  })
  suppliers: ISerializedUser[];

  @BeforeInsert()
  async createProduct() {
    // const productConverter = new ProductConverter();
    // const magexProduct = productConverter.toMagexProduct(this);
    // // @ts-expect-error - magexConnector is not typed
    // const { newProduct } = await magexConnector.products.postProductsCreate({
    //   // @ts-expect-error - magexConnector is not typed
    //   formData: magexProduct,
    // });
    // Object.assign(this, newProduct);
    this.lastSync = new Date().toISOString();
    this._id = Math.random().toString(36).substring(7);
    this.__v = 0;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();

    console.log('Product created', this);
  }

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
  brand: Brand;

  @Column('simple-array')
  category: Category[];

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

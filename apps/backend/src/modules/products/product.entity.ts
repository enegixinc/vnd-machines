import {
  BeforeInsert,
  Column,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryColumn,
} from 'typeorm';
import { Brand, Category, Dimension, IProduct, MultiLang } from '@core';
import { UserEntity } from '../user/user.entity';
import { magexConnector } from '../../services/external-api';
import { ProductConverter } from './dto/bridge/product-converter';

@Entity()
export class ProductEntity implements IProduct {
  @Column({ type: 'varchar', nullable: true })
  upc: string;

  @ManyToMany(() => UserEntity, (user) => user.products, {
    nullable: true,
  })
  suppliers: UserEntity[];

  @PrimaryColumn('varchar')
  _id: string;

  @BeforeInsert()
  isSupplierExist() {
    if (!this.suppliers) {
      this.suppliers = [];
    }
  }

  @BeforeInsert()
  async createProduct() {
    const productConverter = new ProductConverter();
    const magexProduct = productConverter.toMagexProduct(this);
    // @ts-ignore
    const { newProduct } = await magexConnector.products.postProductsCreate({
      formData: magexProduct,
    });
    Object.assign(this, newProduct);
    this.lastSync = new Date().toISOString();
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

  @Column({ type: 'timestamp' })
  createdAt: string;

  @Column({ type: 'timestamp' })
  updatedAt: string;

  // @DeleteDateColumn()
  // @ApiProperty({
  //   example: '2024-05-01T12:00:00.000Z',
  //   description: 'Creation date of the product',
  //   type: String,
  // })
  // deletedAt: string;

  @Column({ type: 'timestamp' })
  lastSync: string;

  @DeleteDateColumn()
  deletedAt: string | null;
}

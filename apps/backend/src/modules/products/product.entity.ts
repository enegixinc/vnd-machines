import { Column, Entity, ManyToOne } from 'typeorm';
import {
  Dimension,
  IProductEntity,
  ISerializedBrand,
  ISerializedCategory,
  ISerializedUser,
  MultiLang,
  ReferenceByID,
} from '@core';
import { fakerAR } from '@faker-js/faker';
import { Factory } from 'nestjs-seeder';

import { DatabaseEntity } from '../../common/database.entity';
import { UserEntity } from '../users/entities/user.entity';
import { BrandEntity } from '../brands/brand.entity';
import { CategoryEntity } from '../categories/category.entity';

@Entity('products')
export class ProductEntity extends DatabaseEntity implements IProductEntity {
  @Factory((faker) => ({
    _id: faker.database.mongodbObjectId(),
  }))
  @ManyToOne(() => UserEntity, (user) => user.products, {})
  suppliers: ReferenceByID<ISerializedUser>[];

  @ManyToOne(() => BrandEntity, (brand) => brand.products, {})
  brand: ReferenceByID<ISerializedBrand>;

  @ManyToOne(() => CategoryEntity, (category) => category.products, {})
  category: ReferenceByID<ISerializedCategory>[];

  @Factory((faker) =>
    faker.number.int({
      min: 10,
      max: 20,
    })
  )
  @Column({ type: 'varchar', nullable: true })
  upc: string;

  @Factory((faker) =>
    faker.commerce.price({
      min: 10,
      max: 100,
    })
  )
  @Column({ type: 'numeric' })
  additionPrice: any;

  @Factory((faker) =>
    faker.number.int({
      min: 18,
      max: 60,
    })
  )
  @Column({ type: 'integer' })
  ageControl: number;

  @Factory((faker) => ({
    en: faker.commerce.productName(),
    ar: fakerAR.commerce.productName(),
  }))
  @Column({ type: 'jsonb' })
  name: MultiLang;

  @Factory((faker) =>
    faker.number.int({
      min: 10,
      max: 20,
    })
  )
  @Column({ type: 'varchar' })
  barcode: string;

  @Factory((faker) =>
    faker.commerce.price({
      min: 10,
      max: 100,
    })
  )
  @Column({ type: 'numeric' })
  costPrice: any;

  @Factory((faker) => ({
    en: faker.commerce.productDescription(),
    ar: fakerAR.commerce.productDescription(),
  }))
  @Column('jsonb')
  description: MultiLang;

  @Factory((faker) => ({
    en: faker.commerce.productDescription(),
    ar: fakerAR.commerce.productDescription(),
  }))
  @Column('jsonb')
  detail: MultiLang;

  @Factory((faker) => ({
    en: faker.commerce.productDescription(),
    ar: fakerAR.commerce.productDescription(),
  }))
  @Column('jsonb')
  include: MultiLang;

  @Factory((faker) => ({
    en: faker.commerce.productDescription(),
    ar: fakerAR.commerce.productDescription(),
  }))
  @Column('jsonb')
  ingredients: MultiLang;

  @Factory((faker) => ({
    en: faker.commerce.productDescription(),
    ar: fakerAR.commerce.productDescription(),
  }))
  @Column('jsonb')
  keyFeatures: MultiLang;

  @Factory((faker) => ({
    en: faker.commerce.productDescription(),
    ar: fakerAR.commerce.productDescription(),
  }))
  @Column('jsonb')
  specification: MultiLang;

  @Factory((faker) => ({
    length: faker.number.float({
      min: 1,
      max: 10,
    }),
    height: faker.number.float({
      min: 1,
      max: 10,
    }),
    width: faker.number.float({
      min: 1,
      max: 10,
    }),
  }))
  @Column('jsonb')
  dimension: Dimension;

  @Factory((faker) =>
    faker.commerce.price({
      min: 10,
      max: 100,
    })
  )
  @Column({ type: 'numeric' })
  price: number;

  @Factory((faker) => faker.datatype.boolean())
  @Column({ type: 'boolean' })
  pricePerKilo: boolean;

  @Factory((faker) => faker.commerce.productMaterial())
  @Column({ type: 'varchar' })
  prodType: string;

  @Factory((faker) => faker.image.url())
  @Column('simple-array')
  productPictures: string[];

  @Factory((faker) => faker.image.url())
  @Column({ type: 'varchar' })
  productVideo: Blob; // TODO: string

  @Factory((faker) => faker.internet.email())
  @Column({ type: 'varchar' })
  referTo: string;

  @Factory((faker) =>
    faker.number.int({
      min: 0,
      max: 1,
    })
  )
  @Column({ type: 'integer' })
  sortIndex: number;

  @Factory((faker) =>
    faker.number.int({
      min: 0,
      max: 1,
    })
  )
  @Column({ type: 'integer' })
  vatIndex: number;

  @Factory((faker) =>
    faker.number.int({
      min: 0,
      max: 1,
    })
  )
  @Column({ type: 'integer' })
  virtualProduct: number;

  // @DeleteDateColumn()
  // @ApiProperty({
  //   example: '2024-05-01T12:00:00.000Z',
  //   description: 'Creation date of the product',
  //   type: String,
  // })
  // deletedAt: string;
}

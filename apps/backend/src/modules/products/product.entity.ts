import { Column, Entity, ManyToOne, ObjectLiteral } from 'typeorm';
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

import { MagexDatabaseEntity } from '../../common/database.entity';
import { UserEntity } from '../users/entities/user.entity';
import { BrandEntity } from '../brands/brand.entity';
import { CategoryEntity } from '../categories/category.entity';
import { MagexService } from '../../services/magex/magex.service';

@Entity('products')
export class ProductEntity
  extends MagexDatabaseEntity
  implements IProductEntity
{
  // @Factory((faker) => ({
  //   _id: faker.database.mongodbObjectId(),
  // }))
  //
  @ManyToOne(() => UserEntity, (user) => user.products)
  supplier: ReferenceByID<ISerializedUser>[];

  @ManyToOne(() => BrandEntity, (brand) => brand.products, {
    cascade: true,
  })
  brand: ReferenceByID<ISerializedBrand>;

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    cascade: true,
  })
  category: ReferenceByID<ISerializedCategory>;

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
      min: 0,
      max: 100,
    })
  )
  @Column({
    type: 'numeric',
    default: 0,
    transformer: {
      to: (value: string) => (value ? parseFloat(value) : 0),
      from: (value: number) => value,
    },
  })
  additionPrice: number;

  @Factory((faker) =>
    faker.number.int({
      min: 0,
      max: 60,
    })
  )
  @Column({ type: 'integer', default: 0 })
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
  @Column({ type: 'varchar', nullable: true })
  barcode: string;

  @Factory((faker) =>
    faker.commerce.price({
      min: 10,
      max: 100,
    })
  )
  @Column({
    type: 'numeric',
    transformer: {
      to: (value: string) => (value ? parseFloat(value) : 0),
      from: (value: number) => value,
    },
  })
  costPrice: number;

  @Factory((faker) => ({
    en: faker.commerce.productDescription(),
    ar: fakerAR.commerce.productDescription(),
  }))
  @Column('jsonb', { nullable: true })
  description: MultiLang;

  @Factory((faker) => ({
    en: faker.commerce.productDescription(),
    ar: fakerAR.commerce.productDescription(),
  }))
  @Column('jsonb', { nullable: true })
  detail: MultiLang;

  @Factory((faker) => ({
    en: faker.commerce.productDescription(),
    ar: fakerAR.commerce.productDescription(),
  }))
  @Column('jsonb', { nullable: true })
  include: MultiLang;

  @Factory((faker) => ({
    en: faker.commerce.productDescription(),
    ar: fakerAR.commerce.productDescription(),
  }))
  @Column('jsonb', { nullable: true })
  ingredients: MultiLang;

  @Factory((faker) => ({
    en: faker.commerce.productDescription(),
    ar: fakerAR.commerce.productDescription(),
  }))
  @Column('jsonb', { nullable: true })
  keyFeatures: MultiLang;

  @Factory((faker) => ({
    en: faker.commerce.productDescription(),
    ar: fakerAR.commerce.productDescription(),
  }))
  @Column('jsonb', { nullable: true })
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
  @Column('jsonb', { nullable: true })
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
  @Column({ type: 'varchar', nullable: true })
  prodType: string;

  @Factory((faker) => faker.image.url())
  @Column('simple-array')
  productPictures: string[];

  @Factory((faker) => faker.image.url())
  @Column({ type: 'varchar', nullable: true })
  productVideo: Blob; // TODO: string

  @Factory((faker) => faker.internet.email())
  @Column({ type: 'varchar', default: 'tryvnd@point24h.com' })
  referTo: string;

  @Factory((faker) =>
    faker.number.int({
      min: 0,
      max: 1,
    })
  )
  @Column({ type: 'integer', default: 0 })
  sortIndex: number;

  @Factory((faker) =>
    faker.number.int({
      min: 0,
      max: 1,
    })
  )
  @Column({ type: 'integer', default: 0 })
  vatIndex: number;

  @Factory((faker) =>
    faker.number.int({
      min: 0,
      max: 1,
    })
  )
  @Column({ type: 'integer', default: 0 })
  virtualProduct: number;

  async createMagexRecord(magexService: MagexService) {
    const formData = await this.handleMultiLangProps(this);
    const { newProduct } = await magexService.products.postProductsCreate({
      formData,
    });

    Object.assign(this, newProduct);
    // @ts-expect-error - to be fixed
    Object.assign(this, { lastSyncAt: newProduct.updatedAt });
  }

  async updateMagexRecord(magexService: MagexService) {
    const formData = await this.handleMultiLangProps(this);

    await magexService.products.putProductsEditById({
      id: formData._id,
      formData,
    });
  }

  async deleteMagexRecord(magexService: MagexService) {
    await magexService.products.deleteProductsDeleteById({
      id: this._id,
    });
  }

  async fetchMagexRecords(magexService: MagexService) {
    return magexService.products.getProductsByAccountName({
      accountName: 'tryvnd@point24h.com',
    }) as Promise<IProductEntity[]>;
  }

  private async handleMultiLangProps(product: ObjectLiteral) {
    const multiLangProps = [
      'name',
      'description',
      'ingredients',
      'detail',
      'include',
      'keyFeatures',
      'specification',
    ];
    return Object.fromEntries(
      Object.entries(product).map(([key, value]) => {
        if (multiLangProps.includes(key)) {
          return [key, JSON.stringify(value)];
        }
        return [key, value];
      })
    );
  }
}

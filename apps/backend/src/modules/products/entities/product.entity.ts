import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  ManyToOne,
  ObjectLiteral,
  OneToMany,
  VirtualColumn,
} from 'typeorm';
import {
  IProductEntity,
  ISerializedBrand,
  ISerializedCategory,
  ISerializedUser,
  ReferenceByID,
} from '@core';
import { Factory } from 'nestjs-seeder';

import { MagexDatabaseEntity } from '../../../common/database.entity';
import { FillRequestProducts } from '../../requests/fill-requests/fill-request.entity';
import { OrderProductsDetails } from '../../orders/order-details.entity';
import { MachineProduct } from '../../machines/entities/machine-product.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { BrandEntity } from '../../brands/brand.entity';
import { CategoryEntity } from '../../categories/category.entity';
import { MagexService } from '../../../services/magex/magex.service';
import { DimensionEntity } from './dimension.entity';
import { MultiLangEntity } from './multiLang.entity';

@Entity('products')
export class ProductEntity
  extends MagexDatabaseEntity
  implements IProductEntity
{
  @BeforeInsert()
  @BeforeUpdate()
  handle() {
    this.searchableText = MultiLangEntity.handleSearchableText([
      this.name,
      this.description,
      this.ingredients,
      this.detail,
      this.include,
      this.keyFeatures,
      this.barcode,
      this.upc,
    ]);

    this.fullName = MultiLangEntity.handleMultiLang(this.name);
  }

  @OneToMany(
    () => FillRequestProducts,
    (fillRequestProducts) => fillRequestProducts.product
  )
  fillRequestProducts: FillRequestProducts[];

  @VirtualColumn({
    type: 'numeric',
    query: (entity) => `
        SELECT
            COALESCE(SUM(OD.quantity), 0)
        FROM
            ORDERS O
            JOIN ORDER_DETAILS OD ON OD.ORDER_ID = O._ID
            JOIN PRODUCTS P ON P._ID = OD.PRODUCT_ID
        WHERE
            P._id = ${entity}._id
    `,
    transformer: {
      from: (value) => Number(value),
      to: (value) => value,
    },
  })
  totalSoldProducts: number;

  @VirtualColumn({
    type: 'numeric',
    query: (entity) => `
        SELECT
            COALESCE(SUM(O.total), 0)
        FROM
            ORDERS O
            JOIN ORDER_DETAILS OD ON OD.ORDER_ID = O._ID
            JOIN PRODUCTS P ON P._ID = OD.PRODUCT_ID
        WHERE
            P._id = ${entity}._id
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
            COALESCE(COUNT(*), 0)
        FROM
            ORDERS O
            JOIN ORDER_DETAILS OD ON OD.ORDER_ID = O._ID
            JOIN PRODUCTS P ON P._ID = OD.PRODUCT_ID
        WHERE
            P._id = ${entity}._id
    `,
    transformer: {
      from: (value) => Number(value),
      to: (value) => value,
    },
  })
  totalOrders: number;

  @OneToMany(
    () => OrderProductsDetails,
    (orderProduct) => orderProduct.product,
    {
      onDelete: 'NO ACTION',
    }
  )
  orders: OrderProductsDetails[];

  @OneToMany(() => MachineProduct, (machineProduct) => machineProduct.product, {
    onDelete: 'NO ACTION',
  })
  machines: MachineProduct[];

  @ManyToOne(() => UserEntity, (user) => user.products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  supplier: ReferenceByID<ISerializedUser>[];

  @ManyToOne(() => BrandEntity, (brand) => brand.products, {
    cascade: true,
  })
  brand: ReferenceByID<ISerializedBrand>;

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    onDelete: 'CASCADE',
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
  @Index({ fulltext: true })
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

  @Column(() => MultiLangEntity)
  name: MultiLangEntity;

  @Column({ type: 'varchar' })
  fullName: string;

  @Index({ fulltext: true })
  @Column({ type: 'varchar' })
  searchableText: string;

  @Column(() => MultiLangEntity)
  description: MultiLangEntity;

  @Column(() => MultiLangEntity)
  detail: MultiLangEntity;

  @Column(() => MultiLangEntity)
  include: MultiLangEntity;

  @Column(() => MultiLangEntity)
  ingredients: MultiLangEntity;

  @Column(() => MultiLangEntity)
  keyFeatures: MultiLangEntity;

  @Column(() => MultiLangEntity)
  specification: MultiLangEntity;

  @Factory((faker) =>
    faker.number.int({
      min: 10,
      max: 20,
    })
  )
  @Column({ type: 'varchar', nullable: true })
  @Index({ fulltext: true })
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
  @Column(() => DimensionEntity)
  dimension: DimensionEntity;

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

  @Factory((faker) =>
    faker.number.int({
      min: 0,
      max: 13,
    })
  )
  @Column({ type: 'integer', default: 0 })
  quantity: number;

  @Factory((faker) =>
    faker.number.int({
      min: 0,
      max: 100,
    })
  )
  @Column({ type: 'integer', default: 0 })
  stock: number;

  async createMagexRecord(magexService: MagexService) {
    const formData = await this.handleMultiLangProps(this);
    const { newProduct } = await magexService.products.postProductsCreate({
      formData: {
        ...formData,
        category: this.category?._id || '',
        brand: this.brand?._id || '',
        referTo: 'tryvnd@point24h.com',
      },
    });

    Object.assign(this, newProduct);
    // @ts-expect-error - to be fixed
    Object.assign(this, { lastSyncAt: newProduct.updatedAt });
  }

  async updateMagexRecord(magexService: MagexService) {
    console.log('updateMagexRecord', magexService);
    console.log('this', this);
    const formData = await this.handleMultiLangProps(this);

    await magexService.products.putProductsEditById({
      id: formData._id,
      formData: {
        ...formData,
        category: this.category?._id || '',
        brand: this.brand?._id || '',
        referTo: 'tryvnd@point24h.com',
      },
    });
  }

  async deleteMagexRecord(magexService: MagexService) {
    await magexService.products.deleteProductsDeleteById({
      id: this._id,
    });
  }

  async fetchMagexRecords(magexService: MagexService) {
    return magexService.products.getProductsByAccountName({
      // TODO: make env
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

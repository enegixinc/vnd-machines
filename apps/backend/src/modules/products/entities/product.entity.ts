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

import {
  MagexDatabaseEntity,
  SearchableMagexEntity,
} from '../../../common/database.entity';
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
  extends SearchableMagexEntity
  implements IProductEntity
{
  @BeforeInsert()
  @BeforeUpdate()
  handleSearchableFields() {
    this.searchableText = MultiLangEntity.handleSearchableText([
      this._id,
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
        COALESCE(SUM(
                   CASE
                     WHEN C."feeType" = 'fixed' THEN COALESCE(C."feePerSale", 0)
                     WHEN C."feeType" = 'percentage' THEN COALESCE(OD."soldPrice" * (C."feePerSale" / 100), 0)
                     ELSE 0
                     END
                 ), 0)
      FROM
        orders AS O
          JOIN order_details AS OD ON OD.order_id = O._id
          JOIN products AS P ON P._id = OD.product_id
          JOIN contracts AS C ON C.supplier_id = P.supplier_id
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
    type: 'numeric',
    query: (entity) => `
        SELECT
            COALESCE(SUM(OD."soldPrice"), 0)
        FROM
            orders AS O
                JOIN order_details AS OD ON OD.order_id = O._id
                JOIN products AS P ON P._id = OD.product_id
        WHERE
            P._id = ${entity}._id
    `,
    transformer: {
      from: (value) => Number(value),
      to: (value) => value,
    },
  })
  totalSales: number;

  @VirtualColumn({
    type: 'numeric',
    query: (entity) => `
        SELECT
            COALESCE(SUM(
                     CASE
                         WHEN C."feeType" = 'fixed' THEN COALESCE(C."feePerSale", 0)
                         WHEN C."feeType" = 'percentage' THEN COALESCE(O.total * (C."feePerSale" / 100), 0)
                         ELSE 0
                     END
             ), 0)
        FROM
            orders AS O
                JOIN order_details AS OD ON OD.order_id = O._id
                JOIN products AS P ON P._id = OD.product_id
                JOIN contracts AS C ON C.supplier_id = P.supplier_id
        WHERE
            C.status = 'active'
            AND C."startDate" <= O."createdAt"
            AND O."createdAt" <= C."endDate"
            AND P._id = ${entity}._id
    `,
    transformer: {
      from: (value) => Number(value),
      to: (value) => value,
    },
  })
  totalActiveRevenue: number;

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
    cascade: true,
  })
  supplier: ReferenceByID<ISerializedUser>;
  @Column({ nullable: true })
  supplier_id: string;

  @ManyToOne(() => BrandEntity, (brand) => brand.products, {
    cascade: true,
  })
  brand: ReferenceByID<ISerializedBrand>;

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    cascade: true,
  })
  category: ReferenceByID<ISerializedCategory>;
  @Column({ nullable: true })
  category_id: string;

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
    const formData = this.handleMultiLangProps(
      this.removeExtraProps(this, ['supplier', 'fullName'])
    );

    console.log('this.category?._id', this.category?._id);
    console.log('this.brand?._id', this.brand?._id);
    const { newProduct } = await magexService.products.postProductsCreate({
      formData: {
        ...formData,
        category: this.category?._id || null,
        brand: this.brand?._id || null,
        referTo: 'tryvnd@point24h.com',
      },
    });

    Object.assign(this, newProduct);
    // @ts-expect-error - to be fixed
    Object.assign(this, { lastSyncAt: newProduct.updatedAt });
  }

  async updateMagexRecord(magexService: MagexService) {
    const formData = this.handleMultiLangProps(
      this.removeExtraProps(this, ['supplier', 'fullName', 'productPictures'])
    );
    console.log('this.category?._id', this.category?._id);
    console.log('this.brand?._id', this.brand?._id);

    await magexService.products.putProductsEditById({
      id: formData._id,
      formData: {
        ...formData,
        category: this.category?._id || null,
        brand: this.brand?._id || null,
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

  private removeExtraProps(object: ObjectLiteral, extraProps: string[]) {
    return Object.fromEntries(
      Object.entries(object).filter(([key]) => !extraProps.includes(key))
    );
  }

  private handleMultiLangProps(product: ObjectLiteral) {
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

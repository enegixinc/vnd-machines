import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  VirtualColumn,
} from 'typeorm';
import {
  ICategoryEntity,
  ISerializedBrand,
  ISerializedProduct,
  ISerializedUser,
  MultiLang,
} from '@core';
import { SearchableMagexEntity } from '../../common/database.entity';
import { ProductEntity } from '../products/entities/product.entity';
import { BrandEntity } from '../brands/brand.entity';
import { Factory } from 'nestjs-seeder';
import { fakerAR } from '@faker-js/faker';
import { MagexService } from '../../services/magex/magex.service';
import { TotalOrders, TotalRevenue, TotalSoldProducts } from './decorators';
import { MultiLangEntity } from '../products/entities/multiLang.entity';
import { OrderEntity } from '../orders/order.entity';

@Entity('categories')
export class CategoryEntity
  extends SearchableMagexEntity
  implements ICategoryEntity
{
  @BeforeInsert()
  @BeforeUpdate()
  handleSearchableFields() {
    this.searchableText = MultiLangEntity.handleSearchableText([
      this._id,
      this.name,
    ]);

    this.fullName = MultiLangEntity.handleMultiLang(this.name);
  }
  @VirtualColumn({
    type: 'array',
    query: (entity) => `
      select coalesce(jsonb_agg(orders), '[]'::jsonb)
      from categories
             join products on categories._id = products.category_id
             join order_details on products._id = order_details.product_id
             join orders on order_details.order_id = orders._id
      where categories._id = ${entity}._id
    `,
  })
  orders: OrderEntity[];

  @TotalSoldProducts('categories', 'category_id')
  totalSoldProducts: number;

  @TotalRevenue('categories', 'category_id')
  totalRevenue: number;

  @TotalOrders('categories', 'category_id')
  totalOrders: number;

  @Factory((faker) => faker.datatype.boolean())
  @Column({ type: 'boolean', default: false })
  auto: boolean;

  @Factory((faker) => faker.image.url())
  @Column({ type: 'varchar' })
  categoryPicture: string;

  @Factory((faker) => ({
    en: faker.commerce.productName(),
    ar: fakerAR.commerce.productName(),
  }))
  @Column({ type: 'jsonb' })
  name: MultiLang;

  @Factory((faker) => faker.internet.email())
  @Column({ type: 'varchar', default: 'tryvnd@point24h.com' })
  referTo: string;

  @Factory((faker) =>
    faker.number.int({
      min: 0,
      max: 1,
    })
  )
  @Column({ type: 'int', default: 0 })
  sortIndex: number;

  @OneToMany(() => ProductEntity, (product) => product.category, {})
  products: ISerializedProduct[];

  @VirtualColumn({
    type: 'array',
    query: (entity) => `
      select coalesce(jsonb_agg(users), '[]'::jsonb)
      from categories
             join products on categories._id = products.category_id
             join users on products.supplier_id = users._id
      where categories._id = ${entity}._id
    `,
  })
  suppliers: ISerializedUser[];

  @ManyToMany(() => BrandEntity, (brand) => brand.categories, {
    nullable: true,
  })
  @JoinTable({
    joinColumn: {
      name: 'categoryId',
      referencedColumnName: '_id',
    },
    inverseJoinColumn: {
      name: 'brandId',
      referencedColumnName: '_id',
    },
  })
  brands: ISerializedBrand[];

  async createMagexRecord(magexService: MagexService) {
    // @ts-expect-error - to be fixed
    const { newCategory } = await magexService.categories.postCategoriesCreate({
      formData: {
        name: JSON.stringify(this.name),
        referTo: 'tryvnd@point24h.com',
        auto: this.auto,
        sortIndex: this.sortIndex,
        // @ts-expect-error - to be fixed
        categoryPicture: this.categoryPicture,
      },
    });
    Object.assign(this, newCategory);
    Object.assign(this, { lastSyncAt: newCategory.updatedAt });
  }

  async deleteMagexRecord(magexService: MagexService) {
    await magexService.categories.deleteCategoriesDeleteById({
      id: this._id,
    });
  }

  async updateMagexRecord(magexService: MagexService) {
    const { newCategory } =
      (await magexService.categories.putCategoriesEditById({
        id: this._id,
        formData: {
          name: JSON.stringify(this.name),
          referTo: 'tryvnd@point24h.com',
          auto: this.auto ? 'true' : 'false',
          sortIndex: this.sortIndex,
        },
      })) as { newCategory: ICategoryEntity };
    Object.assign(this, newCategory);
    Object.assign(this, { lastSyncAt: newCategory.updatedAt });
  }

  async fetchMagexRecords(magexService: MagexService) {
    return (await magexService.categories.getCategoriesByAccountName({
      accountName: 'tryvnd@point24h.com',
    })) as Promise<ICategoryEntity[]>;
  }
}

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
import { SearchableMagexEntity } from '../../common/database.entity';
import {
  IBrandEntity,
  ISerializedCategory,
  ISerializedProduct,
  ISerializedUser,
  MultiLang,
} from '@core';
import { ProductEntity } from '../products/entities/product.entity';
import { UserEntity } from '../users/entities/user.entity';
import { CategoryEntity } from '../categories/category.entity';
import { MagexService } from '../../services/magex/magex.service';
import { OrderEntity } from '../orders/order.entity';
import {
  ActiveRevenue,
  TotalOrders,
  TotalRevenue,
  TotalSales,
  TotalSoldProducts,
} from '../categories/decorators';
import { MultiLangEntity } from '../products/entities/multiLang.entity';

@Entity('brands')
export class BrandEntity extends SearchableMagexEntity implements IBrandEntity {
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
      from brands
             join products on brands._id = products.brand_id
             join order_details on products._id = order_details.product_id
             join orders on order_details.order_id = orders._id
      where brands._id = ${entity}._id
    `,
  })
  orders: OrderEntity[];

  @TotalSoldProducts('brands', 'brand_id')
  totalSoldProducts: number;

  @TotalSales('brands', 'brand_id')
  totalSales: number;

  @TotalRevenue('brands', 'brand_id')
  totalRevenue: number;

  @ActiveRevenue('brands', 'brand_id')
  totalActiveRevenue: number;

  @TotalOrders('brands', 'brand_id')
  totalOrders: number;
  @Column({ type: 'varchar', nullable: true })
  logo: string;
  @Column({ type: 'jsonb' })
  name: MultiLang;
  @Column({ type: 'varchar', nullable: true })
  picture: string;

  @Column({ type: 'varchar', default: 'tryvnd@point24h.com' })
  referTo: string;

  @OneToMany(() => ProductEntity, (product) => product.brand, {})
  products: ISerializedProduct[];

  @ManyToMany(() => CategoryEntity, (category) => category.brands, {
    nullable: true,
  })
  @JoinTable({
    joinColumn: {
      name: 'brandId',
      referencedColumnName: '_id',
    },
    inverseJoinColumn: {
      name: 'categoryId',
      referencedColumnName: '_id',
    },
  })
  categories: ISerializedCategory[];

  @ManyToMany(() => UserEntity, (user) => user.brands, {
    nullable: true,
  })
  @JoinTable({
    joinColumn: {
      name: 'brandId',
      referencedColumnName: '_id',
    },
    inverseJoinColumn: {
      name: 'supplierId',
      referencedColumnName: '_id',
    },
  })
  suppliers: ISerializedUser[];

  async createMagexRecord(magexService: MagexService) {
    const { newBrand } = (await magexService.brands.postBrandsCreate({
      formData: {
        name: JSON.stringify(this.name),
        referTo: 'tryvnd@point24h.com',
        picture: this.base64ToBlob(this.picture),
      },
    })) as { newBrand: IBrandEntity };
    Object.assign(this, newBrand);
    Object.assign(this, { lastSyncAt: newBrand.updatedAt });
  }

  async deleteMagexRecord(mageService: MagexService) {
    await mageService.brands.deleteBrandsDeleteById({
      id: this._id,
    });
  }

  async updateMagexRecord(magexService: MagexService) {
    await magexService.brands.postBrandsEditById({
      id: this._id,
      formData: {
        name: JSON.stringify(this.name),
        referTo: 'tryvnd@point24h.com',
        // @ts-expect-error - to be fixed
        picture: this.base64ToBlob(this.picture),
      },
    });
    const brands = await this.fetchMagexRecords(magexService);
    const newBrand = brands.find((brand) => brand._id === this._id);

    Object.assign(this, newBrand);
    Object.assign(this, { lastSyncAt: newBrand.updatedAt });
  }

  async fetchMagexRecords(magexService: MagexService) {
    return magexService.brands.getBrandsByAccountName({
      accountName: 'tryvnd@point24h.com',
    }) as Promise<IBrandEntity[]>;
  }
}

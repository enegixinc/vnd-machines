import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
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
  TotalOrders,
  TotalRevenue,
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

  @TotalSoldProducts('brands', 'brand_id')
  totalSoldProducts: number;

  @TotalRevenue('brands', 'brand_id')
  totalRevenue: number;

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

  @OneToMany(() => ProductEntity, (product) => product.brand, {
    onDelete: 'CASCADE',
  })
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

  // @OneToMany(() => OrderEntity, (order) => order.brand, {})
  orders: OrderEntity[];

  async createMagexRecord(magexService: MagexService) {
    console.count('createMagexRecord');
    const { newBrand } = (await magexService.brands.postBrandsCreate({
      formData: {
        name: JSON.stringify(this.name),
        referTo: 'tryvnd@point24h.com',
        // @ts-expect-error - to be fixed
        picture: this.picture,
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
    console.count('updateMagexRecord');
    const { newBrand } = (await magexService.brands.postBrandsEditById({
      id: this._id,
      formData: {
        name: JSON.stringify(this.name),
        referTo: 'tryvnd@point24h.com',
      },
    })) as { newBrand: IBrandEntity };
    Object.assign(this, newBrand);
    Object.assign(this, { lastSyncAt: newBrand.updatedAt });
  }

  async fetchMagexRecords(magexService: MagexService) {
    return magexService.brands.getBrandsByAccountName({
      accountName: 'tryvnd@point24h.com',
    }) as Promise<IBrandEntity[]>;
  }
}

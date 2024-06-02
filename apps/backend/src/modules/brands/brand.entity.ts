import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { MagexDatabaseEntity } from '../../common/database.entity';
import {
  IBrandEntity,
  ISerializedCategory,
  ISerializedProduct,
  ISerializedUser,
  MultiLang,
  ReferenceByID,
} from '@core';
import { ProductEntity } from '../products/product.entity';
import { UserEntity } from '../users/entities/user.entity';
import { CategoryEntity } from '../categories/category.entity';
import { MagexService } from '../../services/magex/magex.service';

@Entity('brands')
export class BrandEntity extends MagexDatabaseEntity implements IBrandEntity {
  @Column({ type: 'varchar', nullable: true })
  logo: string;
  @Column({ type: 'jsonb' })
  name: MultiLang;
  @Column({ type: 'varchar', nullable: true })
  picture: string;
  @Column({ type: 'varchar', default: 'tryvnd@point24h.com' })
  referTo: string;

  @OneToMany(() => ProductEntity, (product) => product.brand, {
    nullable: true,
  })
  products: ReferenceByID<ISerializedProduct>[] | null;

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
  categories: ReferenceByID<ISerializedCategory>[] | null;

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
  suppliers: ReferenceByID<ISerializedUser>[] | null;

  async createMagexRecord(magexService: MagexService) {
    console.count('createMagexRecord');
    const { newBrand } = (await magexService.brands.postBrandsCreate({
      formData: {
        name: JSON.stringify(this.name),
        referTo: this.referTo,
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
        referTo: this.referTo,
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

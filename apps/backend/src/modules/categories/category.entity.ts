import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import {
  ICategoryEntity,
  ISerializedBrand,
  ISerializedProduct,
  ISerializedUser,
  MultiLang,
} from '@core';
import { MagexDatabaseEntity } from '../../common/database.entity';
import { ProductEntity } from '../products/product.entity';
import { UserEntity } from '../users/entities/user.entity';
import { BrandEntity } from '../brands/brand.entity';
import { Factory } from 'nestjs-seeder';
import { fakerAR } from '@faker-js/faker';
import { MagexService } from '../../services/magex/magex.service';

@Entity('categories')
export class CategoryEntity
  extends MagexDatabaseEntity
  implements ICategoryEntity
{
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

  @Factory((faker) => [
    {
      _id: faker.database.mongodbObjectId(),
    },
  ])
  @ManyToMany(() => UserEntity, (user) => user.categories, {
    nullable: true,
  })
  @JoinTable({
    joinColumn: {
      name: 'categoryId',
      referencedColumnName: '_id',
    },
    inverseJoinColumn: {
      name: 'userId',
      referencedColumnName: '_id',
    },
  })
  suppliers: ISerializedUser[];

  @Factory((faker) => [
    {
      _id: faker.database.mongodbObjectId(),
    },
  ])
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

  @Factory((faker) => [
    {
      _id: faker.database.mongodbObjectId(),
    },
  ])
  @OneToMany(() => ProductEntity, (product) => product.category, {
    nullable: true,
  })
  products: ISerializedProduct[];

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
    await magexService.categories.putCategoriesEditById({
      id: this._id,
      formData: {
        name: JSON.stringify(this.name),
        referTo: 'tryvnd@point24h.com',
        auto: this.auto ? 'true' : 'false',
        sortIndex: this.sortIndex,
      },
    });
  }

  async fetchMagexRecords(magexService: MagexService) {
    return (await magexService.categories.getCategoriesByAccountName({
      accountName: 'tryvnd@point24h.com',
    })) as Promise<ICategoryEntity[]>;
  }
}

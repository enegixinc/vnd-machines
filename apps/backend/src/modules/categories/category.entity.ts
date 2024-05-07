import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import {
  ICategoryEntity,
  ISerializedBrand,
  ISerializedProduct,
  ISerializedUser,
  MultiLang,
} from '@core';
import { DatabaseEntity } from '../../common/database.entity';
import { ProductEntity } from '../products/product.entity';
import { UserEntity } from '../users/entities/user.entity';
import { BrandEntity } from '../brands/brand.entity';

@Entity('categories')
export class CategoryEntity extends DatabaseEntity implements ICategoryEntity {
  @Column({ type: 'boolean' })
  auto: boolean;
  @Column({ type: 'varchar' })
  categoryPicture: File | Blob;
  @Column({ type: 'jsonb' })
  name: MultiLang;
  @Column({ type: 'varchar' })
  referTo: string;
  @Column({ type: 'int' })
  sortIndex: number;

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

  @OneToMany(() => ProductEntity, (product) => product.category, {
    nullable: true,
    eager: true,
  })
  products: ISerializedProduct[];
}

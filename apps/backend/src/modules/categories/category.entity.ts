import { Column, Entity, OneToMany } from 'typeorm';
import {
  ICategoryEntity,
  ISerializedBrand,
  ISerializedProduct,
  ISerializedUser,
  MultiLang,
} from '@core';
import { ManualDatabaseEntity } from '../../common/database.entity';
import { ProductEntity } from '../products/product.entity';

@Entity('categories')
export class CategoryEntity
  extends ManualDatabaseEntity
  implements ICategoryEntity
{
  @Column({ type: 'boolean' })
  auto: boolean;
  @Column({ type: 'jsonb' })
  brands: ISerializedBrand[];
  @Column({ type: 'varchar' })
  categoryPicture: File | Blob;
  @Column({ type: 'jsonb' })
  name: MultiLang;
  @Column({ type: 'varchar' })
  referTo: string;
  @Column({ type: 'int' })
  sortIndex: number;
  @Column({ type: 'jsonb' })
  suppliers: ISerializedUser[];

  @OneToMany(() => ProductEntity, (product) => product.category, {
    nullable: true,
    eager: true,
  })
  products: ISerializedProduct[];
}

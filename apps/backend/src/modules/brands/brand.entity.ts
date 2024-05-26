import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { DatabaseEntity } from '../../common/database.entity';
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
import { Machine } from '../../../../../libs/core/src/interfaces/machine';
import { MachineEntity } from '../machines/machine.entity';

@Entity('brands')
export class BrandEntity extends DatabaseEntity implements IBrandEntity {
  @Column({ type: 'varchar', nullable: true })
  logo: string;
  @Column({ type: 'jsonb' })
  name: MultiLang;
  @Column({ type: 'varchar', nullable: true })
  picture: string;
  @Column({ type: 'varchar' })
  referTo: string;

  @OneToMany(() => ProductEntity, (product) => product.brand, {
    nullable: true,
    eager: true,
  })
  products: ReferenceByID<ISerializedProduct>[] | null;

  @ManyToMany(() => CategoryEntity, (category) => category.brands, {
    nullable: true,
    eager: true,
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
    eager: true,
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

  @ManyToMany(() => MachineEntity, (machine) => machine.brand, {
    nullable: true,
    eager: true,
  })
  machines: Machine[];
}

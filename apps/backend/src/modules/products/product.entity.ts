import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Brand, Category, Dimension, IProduct, IUser, MultiLang } from '@core';
import { DatabaseEntity } from '../../common/database.entity';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CrudValidationGroups } from '@dataui/crud';
import { UserEntity } from '../user/user.entity';
import { IsNotEmpty, IsOptional } from 'class-validator';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('products')
export class ProductEntity
  extends OmitType(DatabaseEntity, ['id'])
  implements IProduct
{
  __v: number;

  @PrimaryGeneratedColumn('uuid', {
    name: '_id',
  })
  _id: string;

  @ApiProperty({
    example: {
      en: 'Product Name',
      ar: 'اسم المنتج',
    },
  })
  @Column({ type: 'simple-json', nullable: false })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  name: MultiLang;

  @Column()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  additionPrice: any;

  @Column()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  ageControl: number;

  @Column()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  barcode: string;

  @Column({ type: 'simple-json' })
  @ApiProperty({
    type: {
      name: {
        en: 'Brand Name',
        ar: 'اسم العلامة التجارية',
      },
      _id: '123e4567-e89b-12d3-a456-426614174000',
      picture: 'brand.jpg',
    },
  })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  brand: Brand;

  @Column({ type: 'simple-json' })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  category: Category[];

  @ApiProperty({ example: 100 })
  @Column()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  costPrice: any;

  @ApiProperty({
    example: {
      en: 'Product Description',
      ar: 'وصف المنتج',
    },
  })
  @Column({ type: 'string' })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  description: MultiLang;

  @Column({ type: 'simple-json' })
  @ApiProperty({
    example: {
      en: 'Product Detail',
      ar: 'تفاصيل المنتج',
    },
  })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  detail: MultiLang;
  dimension: Dimension;
  include: MultiLang;
  ingredients: MultiLang;
  keyFeatures: MultiLang;
  price: number;
  pricePerKilo: boolean;
  prodType: string;
  productPictures: string[];
  productVideo: string;
  referTo: string;
  sortIndex: number;
  specification: MultiLang;
  upc: string;
  vatIndex: number;
  virtualProduct: number;
  createdAt: string;
  updatedAt: string;

  @ManyToMany(() => UserEntity, (user) => user.products)
  suppliers: IUser[];

  @DeleteDateColumn()
  deletedAt: string;
}

import {
  BeforeInsert,
  Column,
  Entity,
  ManyToMany,
  PrimaryColumn,
} from 'typeorm';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CrudValidationGroups } from '@dataui/crud';
import { IsOptional } from 'class-validator';
import { DatabaseEntity } from '../../common/database.entity';
import { Dimension, IUser, MultiLang } from '@core';
import { UserEntity } from '../user/user.entity';
import { magexConnector } from '../../services/external-api';
import { MagexProduct } from './dto/bridge/toMagexProduct';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('products')
export class ProductEntity extends OmitType(DatabaseEntity, ['id']) {
  @Column({ type: 'varchar', nullable: true })
  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: '1231',
    description: 'UPC of the product',
    type: String,
  })
  upc: string;

  @ManyToMany(() => UserEntity, (user) => user.products, {
    nullable: true,
  })
  @ApiProperty({
    example: ['6b1f1b1b-1b1b-1b1b-1b1b-1b1b1b1b1b1b'],
    description: 'List of users who are suppliers of this product',
    type: () => UserEntity,
  })
  // @IsUUID('4', { each: true })
  @IsOptional({ groups: [UPDATE, CREATE] })
  suppliers: IUser[];

  @PrimaryColumn('varchar')
  _id: string;

  @BeforeInsert()
  async createProduct() {
    // @ts-expect-error
    const { newProduct } = await magexConnector.products
      .postProductsCreate({
        // @ts-expect-error
        formData: new MagexProduct(this),
        authToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWVzaGFyaSIsInJvbGUiOiJVc2VyIiwiZW1haWwiOiJtZXNoYXJpLmFsb2JhaWRpQHRyeXZuZC5jb20iLCJmdWxsQWNjZXNzIjp0cnVlLCJsaW1pdHMiOnsidmlld19wcm9wb3NhbCI6dHJ1ZSwiZWRpdF9wcm9wb3NhbCI6dHJ1ZSwidmlld19zdG9jayI6dHJ1ZSwidmlld19tYWNoaW5lIjp0cnVlLCJlZGl0X21hY2hpbmUiOnRydWUsInZpZXdfcHJvZCI6dHJ1ZSwiZWRpdF9wcm9kIjp0cnVlLCJ2aWV3X2NhdGUiOnRydWUsImVkaXRfY2F0ZSI6dHJ1ZSwidmlld19icmFuZCI6dHJ1ZSwiZWRpdF9icmFuZCI6dHJ1ZSwidmlld19yZWNlaXB0Ijp0cnVlLCJlZGl0X3JlY2VpcHQiOnRydWUsInZpZXdfc3MiOnRydWUsImVkaXRfc3MiOnRydWUsImVkaXRfZ3JvdXAiOnRydWUsImVkaXRfdXNlciI6dHJ1ZSwidmlld19wbGFubyI6dHJ1ZSwiZWRpdF9wbGFubyI6dHJ1ZSwidmlld19wcm9tbyI6dHJ1ZSwiZWRpdF9wcm9tbyI6dHJ1ZSwidmlld19yZXBvcnQiOnRydWUsInZpZXdfdHJhbnMiOnRydWV9LCJpZCI6IjY1N2M0ZTdiYjBmMjg5MTIyNGQ1ZTliMCIsImlhdCI6MTcxNDYwOTIyNywiZXhwIjoxNzE0NjEwMTI3fQ.8NKhA4G_cvQIdNB7-6-x5K8G3ynBVN5Qt95kvTPPQAo',
      })
      .catch((e) => {
        console.error(e);
      });
    console.log(newProduct);
    Object.assign(this, newProduct);
    this.lastSync = new Date().toISOString();
  }

  @Column({ type: 'integer' })
  __v: number;

  @Column({ type: 'numeric' })
  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: 100.5,
    description: 'Additional price of the product',
    type: Number,
  })
  additionPrice: any;

  @Column({ type: 'integer' })
  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: 18,
    description: 'Age control of the product',
    type: Number,
  })
  ageControl: number;

  @Column({ type: 'jsonb' })
  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: {},
    description: 'Name of the product in multiple languages',
  })
  name: MultiLang;

  @Column({ type: 'varchar' })
  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: '1234567890123',
    description: 'Barcode of the product',
    type: String,
  })
  barcode: string;

  @Column({ type: 'varchar' })
  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: '661c2a7345f6ce15dc3df34e',
    description: 'Brand ID of the product',
  })
  brand: string;

  @Column('simple-array')
  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: '6608a4e9e0cde61fd03f1a81',
    description: 'Category ID of the product',
    type: String,
  })
  category: string;

  @Column({ type: 'numeric' })
  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: 99.99,
    description: 'Cost price of the product',
    type: Number,
  })
  costPrice: any;

  @Column({ type: 'timestamp' })
  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: '2024-05-01T12:00:00.000Z',
    description: 'Creation date of the product',
    type: String,
  })
  createdAt: string;

  @Column({ type: 'timestamp' })
  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: '2024-05-01T12:00:00.000Z',
    description: 'Creation date of the product',
    type: String,
  })
  updatedAt: string;

  // @DeleteDateColumn()
  // @ApiProperty({
  //   example: '2024-05-01T12:00:00.000Z',
  //   description: 'Creation date of the product',
  //   type: String,
  // })
  // deletedAt: string;

  @Column({ type: 'timestamp' })
  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: '2024-05-01T12:00:00.000Z',
    description: 'Last Sync date of the product',
    type: String,
  })
  lastSync: string;

  @Column('text')
  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: {
      en: 'Description of the product in English',
      fr: 'Description of the product in French',
    },
    description: 'Description of the product in multiple languages',
  })
  description: MultiLang;
  @Column('text')
  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: {
      en: 'Description of the product in English',
      fr: 'Description of the product in French',
    },
    description: 'Description of the product in multiple languages',
  })
  detail: MultiLang;
  @Column('text')
  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: {
      en: 'Description of the product in English',
      fr: 'Description of the product in French',
    },
    description: 'Description of the product in multiple languages',
  })
  include: MultiLang;
  @Column('text')
  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: {
      en: 'Description of the product in English',
      fr: 'Description of the product in French',
    },
    description: 'Description of the product in multiple languages',
  })
  ingredients: MultiLang;
  @Column('text')
  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: {
      en: 'Description of the product in English',
      fr: 'Description of the product in French',
    },
    description: 'Description of the product in multiple languages',
  })
  keyFeatures: MultiLang;
  @Column('text')
  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: {
      en: 'Description of the product in English',
      fr: 'Description of the product in French',
    },
    description: 'Description of the product in multiple languages',
  })
  specification: MultiLang;

  @Column({ type: 'jsonb' })
  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: {},
    description: 'Dimensions of the product',
  })
  dimension: Dimension;

  @Column({ type: 'numeric' })
  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: 199.99,
    description: 'Price of the product',
    type: Number,
  })
  price: number;

  @Column({ type: 'boolean' })
  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: true,
    description: 'Whether the price is per kilo or not',
    type: Boolean,
  })
  pricePerKilo: boolean;

  @Column({ type: 'varchar' })
  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: 'electronic',
    description: 'Type of the product',
    type: String,
  })
  prodType: string;

  @Column('simple-array')
  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: ['image1.jpg', 'image2.jpg'],
    description: 'Array of product picture URLs',
    type: [String],
  })
  productPictures: string[];

  // @Column({ type: 'varchar' })
  // @IsOptional({ groups: [UPDATE, CREATE] })
  // @ApiProperty({
  //   example: 'video.mp4',
  //   description: 'URL of the product video',
  //   type: String,
  // })
  // productVideo: string;

  @Column({ type: 'varchar' })
  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: 'Refer to some other product',
    description: 'Reference to another product',
    type: String,
  })
  referTo: string;

  @Column({ type: 'integer' })
  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: 1,
    description: 'Index for sorting the product',
    type: Number,
  })
  sortIndex: number;

  @Column({ type: 'integer' })
  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: 1,
    description: 'VAT index of the product',
    type: Number,
  })
  vatIndex: number;

  @Column({ type: 'integer' })
  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: 0,
    description: 'Virtual product indicator',
    type: Number,
  })
  virtualProduct: number;
}

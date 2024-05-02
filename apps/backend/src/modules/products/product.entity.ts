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
import { Brand, Category, Dimension, IProduct, IUser, MultiLang } from '@core';
import { UserEntity } from '../user/user.entity';
import { magexConnector } from '../../services/external-api';
import { MagexProduct } from './dto/bridge/toMagexProduct';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity()
export class ProductEntity
  extends OmitType(DatabaseEntity, ['id'])
  implements IProduct
{
  @Column({ type: 'varchar', nullable: true })
  upc: string;

  @ManyToMany(() => UserEntity, (user) => user.products, {
    nullable: true,
  })
  suppliers: IUser[];

  @PrimaryColumn('varchar')
  _id: string;

  @BeforeInsert()
  async createProduct() {
    console.log('Creating product', this);
    // @ts-ignore
    const { newProduct } = await magexConnector.products
      .postProductsCreate({
        // @ts-expect-error
        formData: new MagexProduct(this),
        authToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWVzaGFyaSIsInJvbGUiOiJVc2VyIiwiZW1haWwiOiJtZXNoYXJpLmFsb2JhaWRpQHRyeXZuZC5jb20iLCJmdWxsQWNjZXNzIjp0cnVlLCJsaW1pdHMiOnsidmlld19wcm9wb3NhbCI6dHJ1ZSwiZWRpdF9wcm9wb3NhbCI6dHJ1ZSwidmlld19zdG9jayI6dHJ1ZSwidmlld19tYWNoaW5lIjp0cnVlLCJlZGl0X21hY2hpbmUiOnRydWUsInZpZXdfcHJvZCI6dHJ1ZSwiZWRpdF9wcm9kIjp0cnVlLCJ2aWV3X2NhdGUiOnRydWUsImVkaXRfY2F0ZSI6dHJ1ZSwidmlld19icmFuZCI6dHJ1ZSwiZWRpdF9icmFuZCI6dHJ1ZSwidmlld19yZWNlaXB0Ijp0cnVlLCJlZGl0X3JlY2VpcHQiOnRydWUsInZpZXdfc3MiOnRydWUsImVkaXRfc3MiOnRydWUsImVkaXRfZ3JvdXAiOnRydWUsImVkaXRfdXNlciI6dHJ1ZSwidmlld19wbGFubyI6dHJ1ZSwiZWRpdF9wbGFubyI6dHJ1ZSwidmlld19wcm9tbyI6dHJ1ZSwiZWRpdF9wcm9tbyI6dHJ1ZSwidmlld19yZXBvcnQiOnRydWUsInZpZXdfdHJhbnMiOnRydWV9LCJpZCI6IjY1N2M0ZTdiYjBmMjg5MTIyNGQ1ZTliMCIsImlhdCI6MTcxNDYzODU4MSwiZXhwIjoxNzE0NjM5NDgxfQ.eGr3SnvRYxpjp4Jbz5cxAZ93YNo9kflZNAYPQl-TmZU',
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
  additionPrice: any;

  @Column({ type: 'integer' })
  ageControl: number;

  @Column({ type: 'jsonb' })
  name: MultiLang;

  @Column({ type: 'varchar' })
  barcode: string;

  @Column({ type: 'varchar' })
  brand: Brand;

  @Column('simple-array')
  category: Category[];

  @Column({ type: 'numeric' })
  costPrice: any;

  @Column('jsonb')
  description: MultiLang;

  @Column('jsonb')
  detail: MultiLang;

  @Column('jsonb')
  include: MultiLang;

  @Column('jsonb')
  ingredients: MultiLang;

  @Column('jsonb')
  keyFeatures: MultiLang;

  @Column('jsonb')
  specification: MultiLang;

  @Column('jsonb')
  dimension: Dimension;

  @Column({ type: 'numeric' })
  price: number;

  @Column({ type: 'boolean' })
  pricePerKilo: boolean;

  @Column({ type: 'varchar' })
  prodType: string;

  @Column('simple-array')
  productPictures: string[];

  @Column({ type: 'varchar' })
  productVideo: string;

  @Column({ type: 'varchar' })
  referTo: string;

  @Column({ type: 'integer' })
  sortIndex: number;

  @Column({ type: 'integer' })
  vatIndex: number;

  @Column({ type: 'integer' })
  virtualProduct: number;

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
  deletedAt: string;
}

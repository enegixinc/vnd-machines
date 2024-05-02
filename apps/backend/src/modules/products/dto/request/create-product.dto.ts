import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@dataui/crud';
import { IsOptional, Validate } from 'class-validator';
import { Dimension, MultiLang } from '@core';
import { UserExistsValidator } from '../../../user/validators/user-exists';

const { CREATE, UPDATE } = CrudValidationGroups;
export class CreateProductDto {
  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: '1231',
    description: 'UPC of the product',
    type: String,
  })
  upc: string;

  @ApiProperty({
    example: ['6b1f1b1b-1b1b-1b1b-1b1b-1b1b1b1b1b1b'],
    description: 'List of users who are suppliers of this product',
    type: () => [String],
  })
  // @IsUUID()
  @Validate(UserExistsValidator, { each: true })
  @IsOptional({ groups: [UPDATE, CREATE] })
  suppliers: string[];

  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: 100.5,
    description: 'Additional price of the product',
    type: Number,
  })
  additionPrice: any;

  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: 18,
    description: 'Age control of the product',
    type: Number,
  })
  ageControl: number;

  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: {
      en: 'Name of the product in English',
      fr: 'Name of the product in French',
    },
    description: 'Name of the product in multiple languages',
  })
  name: MultiLang;

  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: '1234567890123',
    description: 'Barcode of the product',
    type: String,
  })
  barcode: string;

  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: '661c2a7345f6ce15dc3df34e',
    description: 'Brand ID of the product',
  })
  brand: string;

  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: '6608a4e9e0cde61fd03f1a81',
    description: 'Category ID of the product',
    type: String,
  })
  category: string;

  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: 99.99,
    description: 'Cost price of the product',
    type: Number,
  })
  costPrice: number;

  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: {
      en: 'Description of the product in English',
      fr: 'Description of the product in French',
    },
    description: 'Description of the product in multiple languages',
  })
  description: MultiLang;

  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: {
      en: 'Description of the product in English',
      fr: 'Description of the product in French',
    },
    description: 'Description of the product in multiple languages',
  })
  detail: MultiLang;

  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: {
      en: 'Description of the product in English',
      fr: 'Description of the product in French',
    },
    description: 'Description of the product in multiple languages',
  })
  include: MultiLang;

  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: {
      en: 'Description of the product in English',
      fr: 'Description of the product in French',
    },
    description: 'Description of the product in multiple languages',
  })
  ingredients: MultiLang;

  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: {
      en: 'Description of the product in English',
      fr: 'Description of the product in French',
    },
    description: 'Description of the product in multiple languages',
  })
  keyFeatures: MultiLang;

  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: {
      en: 'Description of the product in English',
      fr: 'Description of the product in French',
    },
    description: 'Description of the product in multiple languages',
  })
  specification: MultiLang;

  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: {},
    description: 'Dimensions of the product',
  })
  dimension: Dimension;

  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: 199.99,
    description: 'Price of the product',
    type: Number,
  })
  price: number;

  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: true,
    description: 'Whether the price is per kilo or not',
    type: Boolean,
  })
  pricePerKilo: boolean;

  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: 'electronic',
    description: 'Type of the product',
    type: String,
  })
  prodType: string;

  // TODO: check this
  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: ['image1.jpg', 'image2.jpg'],
    description: 'Array of product picture URLs',
    type: [String],
  })
  productPictures: string[];

  // TODO: check this
  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: 'video.mp4',
    description: 'URL of the product video',
    type: String,
  })
  productVideo: string;

  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: 'Refer to some other product',
    description: 'Reference to another product',
    type: String,
  })
  referTo: string;

  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: 1,
    description: 'Index for sorting the product',
    type: Number,
  })
  sortIndex: number;

  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: 1,
    description: 'VAT index of the product',
    type: Number,
  })
  vatIndex: number;

  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    example: 0,
    description: 'Virtual product indicator',
    type: Number,
  })
  virtualProduct: number;
}

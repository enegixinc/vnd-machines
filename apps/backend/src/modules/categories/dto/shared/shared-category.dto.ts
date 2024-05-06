import { decorate } from 'ts-mixer';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Dimension, MultiLang } from '@core';
import { CrudValidationGroups } from '@dataui/crud';

const { CREATE, UPDATE } = CrudValidationGroups;

export class SharedCategoryDto {
  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      example: '1231',
      description: 'UPC of the product',
      type: String,
    })
  )
  upc: string;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      example: 100.5,
      description: 'Additional price of the product',
      type: Number,
    })
  )
  additionPrice: any;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      example: 18,
      description: 'Age control of the product',
      type: Number,
    })
  )
  ageControl: number;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      example: {
        en: 'Name of the product in English',
        fr: 'Name of the product in French',
      },
      description: 'Name of the product in multiple languages',
      type: Object,
    })
  )
  name: MultiLang;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      example: '1234567890123',
      description: 'Barcode of the product',
      type: String,
    })
  )
  barcode: string;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      example: 99.99,
      description: 'Cost price of the product',
      type: Number,
    })
  )
  costPrice: number;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      example: {
        en: 'Description of the product in English',
        fr: 'Description of the product in French',
      },
      description: 'Description of the product in multiple languages',
      type: Object,
    })
  )
  description: MultiLang;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      example: {
        en: 'Description of the product in English',
        fr: 'Description of the product in French',
      },
      description: 'Description of the product in multiple languages',
      type: Object,
    })
  )
  detail: MultiLang;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      example: {
        en: 'Description of the product in English',
        fr: 'Description of the product in French',
      },
      description: 'Description of the product in multiple languages',
      type: Object,
    })
  )
  include: MultiLang;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      example: {
        en: 'Description of the product in English',
        fr: 'Description of the product in French',
      },
      description: 'Description of the product in multiple languages',
      type: Object,
    })
  )
  ingredients: MultiLang;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      example: {
        en: 'Description of the product in English',
        fr: 'Description of the product in French',
      },
      description: 'Description of the product in multiple languages',
      type: Object,
    })
  )
  keyFeatures: MultiLang;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      example: {
        en: 'Description of the product in English',
        fr: 'Description of the product in French',
      },
      description: 'Description of the product in multiple languages',
      type: Object,
    })
  )
  specification: MultiLang;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      example: {},
      description: 'Dimensions of the product',
      type: Object,
    })
  )
  dimension: Dimension;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      example: 199.99,
      description: 'Price of the product',
      type: Number,
    })
  )
  price: number;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      example: true,
      description: 'Whether the price is per kilo or not',
      type: Boolean,
    })
  )
  pricePerKilo: boolean;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      example: 'electronic',
      description: 'Type of the product',
      type: String,
    })
  )
  prodType: string;

  // TODO: check this
  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      example: ['image1.jpg', 'image2.jpg'],
      description: 'Array of product picture URLs',
      type: [String],
    })
  )
  productPictures: string[];

  // TODO: check this
  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      example: 'video.mp4',
      description: 'URL of the product video',
      type: String,
    })
  )
  productVideo: string;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      example: 'Refer to some other product',
      description: 'Reference to another product',
      type: String,
    })
  )
  referTo: string;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      example: 1,
      description: 'Index for sorting the product',
      type: Number,
    })
  )
  sortIndex: number;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      example: 1,
      description: 'VAT index of the product',
      type: Number,
    })
  )
  vatIndex: number;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      example: 0,
      description: 'Virtual product indicator',
      type: Number,
    })
  )
  virtualProduct: number;
}

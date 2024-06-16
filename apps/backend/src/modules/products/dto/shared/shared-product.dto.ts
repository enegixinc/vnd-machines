import { decorate } from 'ts-mixer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MultiLang } from '@core';
import { CrudValidationGroups } from '@dataui/crud';
import { Type } from 'class-transformer';
import { DimensionEntity } from '../../entities/dimension.entity';
import { MultiLangEntity } from '../../entities/multiLang.entity';

const { CREATE, UPDATE } = CrudValidationGroups;

export class SharedProductDto {
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

  @decorate(Type(() => MultiLangEntity))
  @decorate(ValidateNested())
  @decorate(
    ApiProperty({
      type: MultiLangEntity,
    })
  )
  name: MultiLangEntity;

  @decorate(Type(() => MultiLangEntity))
  @decorate(ValidateNested())
  @decorate(
    ApiProperty({
      type: MultiLangEntity,
    })
  )
  description: MultiLang;

  @decorate(Type(() => MultiLangEntity))
  @decorate(ValidateNested())
  @decorate(
    ApiProperty({
      type: MultiLangEntity,
    })
  )
  detail: MultiLang;

  @decorate(Type(() => MultiLangEntity))
  @decorate(ValidateNested())
  @decorate(
    ApiProperty({
      type: MultiLangEntity,
    })
  )
  include: MultiLang;

  @decorate(Type(() => MultiLangEntity))
  @decorate(ValidateNested())
  @decorate(
    ApiProperty({
      type: MultiLangEntity,
    })
  )
  ingredients: MultiLang;

  @decorate(Type(() => MultiLangEntity))
  @decorate(ValidateNested())
  @decorate(
    ApiProperty({
      type: MultiLangEntity,
    })
  )
  keyFeatures: MultiLang;

  @decorate(Type(() => MultiLangEntity))
  @decorate(ValidateNested())
  @decorate(
    ApiProperty({
      type: MultiLangEntity,
    })
  )
  specification: MultiLang;

  @decorate(Type(() => DimensionEntity))
  @decorate(ValidateNested())
  @decorate(
    ApiProperty({
      type: DimensionEntity,
    })
  )
  dimension: DimensionEntity;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(IsNumber({}, { groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      example: 199.99,
      description: 'Price of the product',
      type: Number,
    })
  )
  price: number;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(IsBoolean({ groups: [UPDATE, CREATE] }))
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

import { CrudValidationGroups } from '@dataui/crud';
import { MultiLang } from '@core';
import { decorate } from 'ts-mixer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FormatMoney } from 'format-money-js';

const { CREATE, UPDATE } = CrudValidationGroups;

export class SharedCategoryDto {
  @decorate(
    ApiProperty({
      type: 'number',
      example: 0,
    })
  )
  totalSoldProducts: number;

  @decorate(
    ApiProperty({
      type: 'number',
      example: new FormatMoney().un(33421.233, {
        decimals: 2,
        decimalPoint: '.',
      }),
    })
  )
  totalRevenue: number;

  @decorate(
    ApiProperty({
      type: 'number',
      example: 0,
    })
  )
  totalOrders: number;


  @decorate(IsNotEmpty({ groups: [CREATE] }))
  @decorate(IsOptional({ groups: [UPDATE] }))
  @decorate(
    ApiProperty({
      example: {
        en: 'Name of the Category in English',
        ar: 'Name of the Category in Arabic',
      },
      description: 'Name of the Category in multiple languages',
      type: Object,
    })
  )
  name: MultiLang;

  @decorate(IsOptional({ groups: [UPDATE] }))
  @decorate(IsNotEmpty({ groups: [CREATE] }))
  @decorate(
    ApiProperty({
      type: Boolean,
    })
  )
  auto: boolean;

  @decorate(IsOptional({ groups: [UPDATE] }))
  @decorate(IsNotEmpty({ groups: [CREATE] }))
  @decorate(
    ApiProperty({
      example: 'https://www.local.com/image.jpg',
      description: 'Category picture',
      type: String,
      required: false,
    })
  )
  categoryPicture?: string;

  @decorate(IsOptional({ groups: [UPDATE] }))
  @decorate(IsNotEmpty({ groups: [CREATE] }))
  @decorate(
    ApiProperty({
      example: 1,
      description: 'Sort index',
      type: Number,
    })
  )
  sortIndex: number;
}

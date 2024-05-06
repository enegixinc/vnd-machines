import { CrudValidationGroups } from '@dataui/crud';
import { MultiLang } from '@core';
import { decorate } from 'ts-mixer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const { CREATE, UPDATE } = CrudValidationGroups;

export class SharedCategoryDto {
  @decorate(IsNotEmpty({ groups: [CREATE] }))
  @decorate(IsOptional({ groups: [UPDATE] }))
  @decorate(
    ApiProperty({
      example: {
        en: 'Name of the Category in English',
        fr: 'Name of the Category in French',
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
      example: 'example@email.com',
      description: 'Email of the owner',
      type: String,
    })
  )
  @decorate(
    ApiProperty({
      type: Boolean,
    })
  )
  auto: boolean;

  @decorate(
    ApiProperty({
      example: 'https://www.local.com/image.jpg',
      description: 'Category picture',
      type: String,
    })
  )
  categoryPicture: string;

  @decorate(
    ApiProperty({
      example: 'example@email.com',
      description: 'Email of the owner',
      type: String,
    })
  )
  referTo: string;

  @decorate(
    ApiProperty({
      example: 1,
      description: 'Sort index',
      type: Number,
    })
  )
  sortIndex: number;
}

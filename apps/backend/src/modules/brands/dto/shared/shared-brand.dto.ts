import { decorate } from 'ts-mixer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MultiLang } from '@core';
import { CrudValidationGroups } from '@dataui/crud';

const { CREATE, UPDATE } = CrudValidationGroups;

export class SharedBrandDto {
  @decorate(IsNotEmpty({ groups: [CREATE] }))
  @decorate(IsOptional({ groups: [UPDATE] }))
  @decorate(
    ApiProperty({
      example: {
        en: 'Name of the product in English',
        ar: 'Name in Arabic',
      },
      description: 'Name of the product in multiple languages',
      type: Object,
    })
  )
  name: MultiLang;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      example: 'https://www.local.com/image.jpg',
      description: 'Brand picture',
      type: String,
      required: false,
    })
  )
  picture: string;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      example: 'https://www.local.com/image.jpg',
      description: 'Brand logo',
      type: String,
      required: false,
    })
  )
  logo: string;
}

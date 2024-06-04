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

  @decorate(IsOptional({ groups: [UPDATE] }))
  @decorate(IsNotEmpty({ groups: [CREATE] }))
  @decorate(
    ApiProperty({
      example: 'tryvnd@point24h.com',
      description: 'Email of the owner',
      type: String,
    })
  )
  referTo: string;

  @decorate(
    ApiProperty({
      example: 'https://www.local.com/image.jpg',
      description: 'Brand logo',
      type: String,
    })
  )
  logo: string;

  @decorate(
    ApiProperty({
      example: 'https://www.local.com/image.jpg',
      description: 'Brand picture',
      type: String,
    })
  )
  picture: string;
}

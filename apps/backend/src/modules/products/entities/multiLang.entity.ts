import { Column } from 'typeorm';
import { Factory } from 'nestjs-seeder';
import { fakerAR } from '@faker-js/faker';
import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@dataui/crud';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MultiLang } from '@core';

const { CREATE, UPDATE } = CrudValidationGroups;

export class MultiLangEntity {
  @Factory(() => fakerAR.lorem.sentence())
  @Column({
    default: '',
    type: 'varchar',
  })
  @ApiProperty({
    example: 'العربيه',
    type: String,
  })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString({ groups: [CREATE, UPDATE] })
  ar: string;

  @Factory((faker) => faker.lorem.sentence())
  @Column({
    default: '',
    type: 'varchar',
  })
  @ApiProperty({
    example: 'English',
    type: String,
  })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString({ groups: [CREATE, UPDATE] })
  en: string;

  static handleMultiLang<T extends MultiLang>(name: T) {
    const en = name?.en || '';
    const ar = name?.ar || '';

    return en && ar ? `${en} - ${ar}` : en || ar;
  }

  static handleSearchableText<T extends (MultiLang | number | string)[]>(
    fields: T
  ) {
    return fields
      .map((field) => {
        switch (typeof field) {
          case 'string':
            return field;
          case 'number':
            return field.toString();
          default:
            return MultiLangEntity.handleMultiLang(field);
        }
      })
      .join(' | ');
  }
}

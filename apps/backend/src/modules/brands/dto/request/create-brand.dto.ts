import { CrudValidationGroups } from '@dataui/crud';
import { ICreateBrand } from '@core';
import { decorate } from 'ts-mixer';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SharedBrandDto } from '../shared/shared-brand.dto';

const { CREATE, UPDATE } = CrudValidationGroups;

export class CreateBrandDto extends SharedBrandDto implements ICreateBrand {
  // @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  // @decorate(
  //   ApiProperty({
  //     type: () => PickType(SerializedUserDto, ['_id']),
  //     isArray: true,
  //   })
  // )
  // suppliers: ReferenceByID<ISerializedUser>[] | null;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      example: 'https://www.local.com/image.jpg',
      description: 'Brand picture',
      type: String,
    })
  )
  picture: string;

  // @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  // @decorate(
  //   ApiProperty({
  //     type: () => PickType(SerializedProductDto, ['_id']),
  //     isArray: true,
  //   })
  // )
  // products: ReferenceByID<ISerializedProduct>[] | null;

  // @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  // @decorate(
  //   ApiProperty({
  //     type: () => PickType(SerializedCategoryDto, ['_id']),
  //     isArray: true,
  //   })
  // )
  // categories: ReferenceByID<ISerializedCategory>[];

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      example: 'https://www.local.com/image.jpg',
      description: 'Brand logo',
      type: String,
    })
  )
  logo: string;
}

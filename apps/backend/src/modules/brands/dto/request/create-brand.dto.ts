import { CrudValidationGroups } from '@dataui/crud';
import {
  ICreateBrand,
  ISerializedCategory,
  ISerializedProduct,
  ISerializedUser,
  ReferenceByID,
} from '@core';
import { decorate } from 'ts-mixer';
import { IsOptional } from 'class-validator';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { SerializedCategoryDto } from '../../../categories/dto/response/serialized-category.dto';
import { SerializedProductDto } from '../../../products/dto/response/serialized-product.dto';
import { SerializedUserDto } from '../../../users/dto/response/serialized-user.dto';
import { SharedBrandDto } from '../shared/shared-brand.dto';

const { CREATE, UPDATE } = CrudValidationGroups;

export class CreateBrandDto extends SharedBrandDto implements ICreateBrand {
  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      type: () => [OmitType(SerializedUserDto, ['brand'])],
    })
  )
  suppliers: ReferenceByID<ISerializedUser>[] | null;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      example: 'https://www.local.com/image.jpg',
      description: 'Brand picture',
      type: String,
    })
  )
  picture: string;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      type: () => [OmitType(SerializedProductDto, ['brand'])],
    })
  )
  products: ReferenceByID<ISerializedProduct>[] | null;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      type: () => [OmitType(SerializedCategoryDto, ['brands'])],
    })
  )
  categories: ReferenceByID<ISerializedCategory>[];

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

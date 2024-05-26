import { ApiProperty, PickType } from '@nestjs/swagger';
import { CrudValidationGroups } from '@dataui/crud';
import { IsOptional, Validate } from 'class-validator';
import { UserExistsValidator } from '../../../users/validators/user-exists';
import { decorate } from 'ts-mixer';
import { SharedProductDto } from '../shared/shared-product.dto';
import { SerializedUserDto } from '../../../users/dto/response/serialized-user.dto';
import {
  ICreateProduct,
  ISerializedBrand,
  ISerializedCategory,
  ISerializedUser,
  ReferenceByID,
} from '@core';
import { SerializedBrandDto } from '../../../brands/dto/response/serialized-brand.dto';
import { SerializedCategoryDto } from '../../../categories/dto/response/serialized-category.dto';

const { CREATE, UPDATE } = CrudValidationGroups;

export class CreateProductDto
  extends SharedProductDto
  implements ICreateProduct
{
  @decorate(
    ApiProperty({
      type: () => PickType(SerializedUserDto, ['_id']),
    })
  )
  @decorate(Validate(UserExistsValidator))
  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  supplier: ReferenceByID<ISerializedUser>[];

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      type: () => PickType(SerializedBrandDto, ['_id']),
    })
  )
  brand: ReferenceByID<ISerializedBrand>;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      type: () => PickType(SerializedCategoryDto, ['_id']),
    })
  )
  category: ReferenceByID<ISerializedCategory>;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      type: 'File',
    })
  )
  productVideo: File | Blob;
}

import {
  ISerializedBrand,
  ISerializedCategory,
  ISerializedProduct,
  ISerializedUser,
} from '@core';
import { decorate, Mixin } from 'ts-mixer';
import { DatabaseEntity } from '../../../../common/database.entity';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { SerializedUserDto } from '../../../users/dto/response/serialized-user.dto';
import { SerializedBrandDto } from '../../../brands/dto/response/serialized-brand.dto';
import { SerializedProductDto } from '../../../products/dto/response/serialized-product.dto';
import { SharedCategoryDto } from '../shared/shared-category.dto';

export class SerializedCategoryDto
  extends Mixin(DatabaseEntity, SharedCategoryDto)
  implements ISerializedCategory
{
  @decorate(
    ApiProperty({
      type: () => [
        OmitType(SerializedProductDto, ['category', 'suppliers', 'brand']),
      ],
    })
  )
  products: ISerializedProduct[];

  @decorate(
    ApiProperty({
      type: () => [OmitType(SerializedUserDto, ['brand', 'products'])],
    })
  )
  suppliers: ISerializedUser[];

  @decorate(
    ApiProperty({
      type: () => [
        OmitType(SerializedBrandDto, ['categories', 'products', 'suppliers']),
      ],
    })
  )
  brands: ISerializedBrand[];
}

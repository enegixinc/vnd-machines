import {
  ISerializedBrand,
  ISerializedCategory,
  ISerializedProduct,
  ISerializedUser,
} from '@core';

import { ApiProperty, OmitType } from '@nestjs/swagger';
import { decorate, Mixin } from 'ts-mixer';
import { DatabaseEntity } from '../../../../common/database.entity';
import { SharedProductDto } from '../shared/shared-product.dto';
import { SerializedUserDto } from '../../../users/dto/response/serialized-user.dto';
import { SerializedBrandDto } from '../../../brands/dto/response/serialized-brand.dto';
import { SerializedCategoryDto } from '../../../categories/dto/response/serialized-category.dto';

export class SerializedProductDto
  extends Mixin(DatabaseEntity, SharedProductDto)
  implements ISerializedProduct
{
  @decorate(
    ApiProperty({
      type: () => [OmitType(SerializedCategoryDto, ['products'])],
    })
  )
  category: ISerializedCategory[];

  @decorate(
    ApiProperty({
      type: () => [OmitType(SerializedBrandDto, ['products'])],
    })
  )
  brand: ISerializedBrand;

  @decorate(
    ApiProperty({
      type: () => [OmitType(SerializedUserDto, ['products'])],
    })
  )
  suppliers: ISerializedUser[];

  @decorate(
    ApiProperty({
      example: 'https://www.youtube.com/watch?v=1234567890',
      description: 'Video of the product',
      type: String,
    })
  )
  productVideo: string;
}

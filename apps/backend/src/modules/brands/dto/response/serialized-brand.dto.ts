import { decorate, Mixin } from 'ts-mixer';
import { ManualDatabaseEntity } from '../../../../common/database.entity';
import { SharedBrandDto } from '../shared/shared-brand.dto';
import {
  ISerializedBrand,
  ISerializedCategory,
  ISerializedProduct,
  ISerializedUser,
} from '@core';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { SerializedUserDto } from '../../../users/dto/response/serialized-user.dto';
import { SerializedCategoryDto } from '../../../categories/dto/response/serialized-category.dto';
import { SerializedProductDto } from '../../../products/dto/response/serialized-product.dto';

export class SerializedBrandDto
  extends Mixin(ManualDatabaseEntity, SharedBrandDto)
  implements ISerializedBrand
{
  @decorate(
    ApiProperty({
      type: () => [
        OmitType(SerializedCategoryDto, ['brands', 'suppliers', 'products']),
      ],
    })
  )
  categories: ISerializedCategory[];

  @decorate(
    ApiProperty({
      type: () => [
        OmitType(SerializedProductDto, ['brand', 'category', 'suppliers']),
      ],
    })
  )
  products: ISerializedProduct[];

  @decorate(
    ApiProperty({
      type: () => [OmitType(SerializedUserDto, ['products', 'brand'])],
    })
  )
  suppliers: ISerializedUser[];

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

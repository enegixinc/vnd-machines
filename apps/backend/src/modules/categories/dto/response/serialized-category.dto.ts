import {
  ISerializedBrand,
  ISerializedCategory,
  ISerializedProduct,
  ISerializedUser,
} from '@core';
import { decorate, Mixin } from 'ts-mixer';
import { DatabaseEntity } from '../../../../common/database.entity';
import { ApiProperty } from '@nestjs/swagger';
import { SharedCategoryDto } from '../shared/shared-category.dto';
import { SharedProductDto } from '../../../products/dto/shared/shared-product.dto';
import { SharedUserDto } from '../../../users/dto/shared/shared-user.dto';
import { SharedBrandDto } from '../../../brands/dto/shared/shared-brand.dto';

export class SerializedCategoryDto
  extends Mixin(DatabaseEntity, SharedCategoryDto)
  implements ISerializedCategory
{
  @decorate(
    ApiProperty({
      type: () => [SharedProductDto],
    })
  )
  products: ISerializedProduct[];

  @decorate(
    ApiProperty({
      type: () => [SharedUserDto],
    })
  )
  suppliers: ISerializedUser[];

  @decorate(
    ApiProperty({
      type: () => [SharedBrandDto],
    })
  )
  brands: ISerializedBrand[];
}

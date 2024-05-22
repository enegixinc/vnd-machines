import { decorate, Mixin } from 'ts-mixer';
import { DatabaseEntity } from '../../../../common/database.entity';
import { SharedBrandDto } from '../shared/shared-brand.dto';
import {
  ISerializedBrand,
  ISerializedCategory,
  ISerializedProduct,
  ISerializedUser,
} from '@core';
import { ApiProperty } from '@nestjs/swagger';
import { SerializedUserDto } from '../../../users/dto/response/serialized-user.dto';
import { SerializedProductDto } from '../../../products/dto/response/serialized-product.dto';
import { SharedCategoryDto } from '../../../categories/dto/shared/shared-category.dto';

class ResolvedBrandDto {
  @decorate(
    ApiProperty({
      type: () => [SharedCategoryDto],
    })
  )
  categories: ISerializedCategory[];

  @decorate(
    ApiProperty({
      type: () => [SerializedProductDto],
    })
  )
  products: ISerializedProduct[];

  @decorate(
    ApiProperty({
      type: () => [SerializedUserDto],
    })
  )
  suppliers: ISerializedUser[];
}

export class SerializedBrandDto
  extends Mixin(DatabaseEntity, SharedBrandDto, ResolvedBrandDto)
  implements ISerializedBrand {}

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
import { SharedCategoryDto } from '../../../categories/dto/shared/shared-category.dto';
import { SharedProductDto } from '../../../products/dto/shared/shared-product.dto';

class ResolvedBrandDto {
  @decorate(
    ApiProperty({
      type: () => [SharedCategoryDto],
    })
  )
  categories: ISerializedCategory[];

  @decorate(
    ApiProperty({
      type: () => [SharedProductDto],
    })
  )
  products: ISerializedProduct[];

  @decorate(
    ApiProperty({
      type: () => [SharedProductDto],
    })
  )
  suppliers: ISerializedUser[];
}

export class SerializedBrandDto
  extends Mixin(DatabaseEntity, SharedBrandDto, ResolvedBrandDto)
  implements ISerializedBrand {}

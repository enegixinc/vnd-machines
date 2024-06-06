import { decorate, Mixin } from 'ts-mixer';
import { DatabaseEntity } from '../../../../common/database.entity';
import { SharedBrandDto } from '../shared/shared-brand.dto';
import { ISerializedBrand, ISerializedCategory, ISerializedProduct, ISerializedUser } from '@core';
import { ApiProperty } from '@nestjs/swagger';
import { SharedCategoryDto } from '../../../categories/dto/shared/shared-category.dto';
import { SharedProductDto } from '../../../products/dto/shared/shared-product.dto';
import { FormatMoney } from 'format-money-js';

class ResolvedBrandDto {
  @decorate(
    ApiProperty({
      type: 'number',
      example: 0,
    })
  )
  totalSoldProducts: number;

  @decorate(
    ApiProperty({
      type: 'number',
      example: new FormatMoney().un(33421.233, {
        decimals: 2,
        decimalPoint: '.',
      }),
    })
  )
  totalRevenue: number;

  @decorate(
    ApiProperty({
      type: 'number',
      example: 0,
    })
  )
  totalOrders: number;

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

  @decorate(
    ApiProperty({
      example: 'tryvnd@point24h.com',
      description: 'Reference to another product',
      type: String,
    })
  )
  referTo: string;
}

export class SerializedBrandDto
  extends Mixin(DatabaseEntity, SharedBrandDto, ResolvedBrandDto)
  implements ISerializedBrand {}

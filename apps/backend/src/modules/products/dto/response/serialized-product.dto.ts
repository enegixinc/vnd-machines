import {
  ISerializedBrand,
  ISerializedCategory,
  ISerializedProduct,
  ISerializedUser,
} from '@core';

import { ApiProperty } from '@nestjs/swagger';
import { decorate, Mixin } from 'ts-mixer';
import { DatabaseEntity } from '../../../../common/database.entity';
import { SharedProductDto } from '../shared/shared-product.dto';
import { SharedBrandDto } from '../../../brands/dto/shared/shared-brand.dto';
import { SharedUserDto } from '../../../users/dto/shared/shared-user.dto';
import { SharedCategoryDto } from '../../../categories/dto/shared/shared-category.dto';
import { OrderEntity } from '../../../orders/order.entity';
import { FormatMoney } from 'format-money-js';

export class SerializedProductDto
  extends Mixin(DatabaseEntity, SharedProductDto)
  implements ISerializedProduct
{
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
      example: 'https://www.youtube.com/watch?v=1234567890',
      description: 'Video of the product',
      type: String,
    })
  )
  productVideo: string;

  @decorate(
    ApiProperty({
      type: () => SharedCategoryDto,
    })
  )
  category: ISerializedCategory;

  @decorate(
    ApiProperty({
      type: () => SharedBrandDto,
    })
  )
  brand: ISerializedBrand;

  @decorate(
    ApiProperty({
      type: () => SharedUserDto,
    })
  )
  supplier: ISerializedUser[];

  @decorate(
    ApiProperty({
      type: () => OrderEntity,
      isArray: true,
    })
  )
  orders: OrderEntity[];

  @decorate(
    ApiProperty({
      example: 'tryvnd@point24h.com',
      description: 'Reference to another product',
      type: String,
    })
  )
  referTo: string;
}

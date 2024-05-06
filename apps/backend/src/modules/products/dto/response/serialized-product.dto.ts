import {
  ISerializedBrand,
  ISerializedCategory,
  ISerializedProduct,
  ISerializedUser,
} from '@core';

import { ApiProperty, OmitType } from '@nestjs/swagger';
import { decorate, Mixin } from 'ts-mixer';
import { ManualDatabaseEntity } from '../../../../common/database.entity';
import { SharedProductDto } from '../shared/shared-product.dto';
import { SerializedUserDto } from '../../../users/dto/response/serialized-user.dto';

export class SerializedProductDto
  extends Mixin(ManualDatabaseEntity, SharedProductDto)
  implements ISerializedProduct
{
  @decorate(
    ApiProperty({
      example: 1,
      description: 'Version',
      type: Number,
    })
  )
  __v: number;

  @decorate(
    ApiProperty({
      example: '2024-05-01T12:00:00.000Z',
      description: 'Last sync date of the product',
      type: String,
    })
  )
  category: ISerializedCategory[];

  @decorate(
    ApiProperty({
      example: '2024-05-01T12:00:00.000Z',
      description: 'Last sync date of the product',
      type: String,
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

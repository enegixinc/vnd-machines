import { Brand, Category, IProduct, ISerializedUser } from '@core';

import { ApiProperty, OmitType } from '@nestjs/swagger';
import { decorate, Mixin } from 'ts-mixer';
import { ManualDatabaseEntity } from '../../../../common/database.entity';
import { SharedProductDto } from '../shared/shared-product.dto';
import { SerializedUserDto } from '../../../user/dto/response/serialized-user.dto';

export class SerializedProductDto
  extends Mixin(ManualDatabaseEntity, SharedProductDto)
  implements IProduct
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
  category: Category[];

  @decorate(
    ApiProperty({
      example: '2024-05-01T12:00:00.000Z',
      description: 'Last sync date of the product',
      type: String,
    })
  )
  brand: Brand;
  @decorate(
    ApiProperty({
      type: () => [OmitType(SerializedUserDto, ['products'])],
    })
  )
  suppliers: ISerializedUser[];
}

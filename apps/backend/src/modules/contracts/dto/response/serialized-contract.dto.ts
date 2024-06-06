import { DatabaseEntity } from '../../../../common/database.entity';
import { ISerializedContract, ISerializedUser } from '@core';
import { decorate, Mixin } from 'ts-mixer';
import { SharedContractDto } from '../shared';
import { ApiProperty } from '@nestjs/swagger';
import { SerializedUserDto } from '../../../users/dto/response/serialized-user.dto';

export class SerializedContractDto
  extends Mixin(DatabaseEntity, SharedContractDto)
  implements ISerializedContract
{
  @decorate(
    ApiProperty({
      type: () => SerializedUserDto,
    })
  )
  supplier: ISerializedUser;

  @decorate(
    ApiProperty({
      type: () => String,
      example: 4213,
    })
  )
  totalRevenue: number;

  @decorate(
    ApiProperty({
      type: () => String,
      example: 213,
    })
  )
  totalOrders: number;
}

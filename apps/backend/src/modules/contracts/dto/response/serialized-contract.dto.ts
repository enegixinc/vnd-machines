import { DatabaseEntity } from '../../../../common/database.entity';
import { ISerializedContract, ISerializedUser } from '@core';
import { decorate, Mixin } from 'ts-mixer';
import { SharedContractDto } from '../shared';
import { ApiProperty } from '@nestjs/swagger';
import { SerializedUserDto } from '../../../users/dto/response/serialized-user.dto';
import { FormatMoney } from 'format-money-js';

export class SerializedContractDto
  extends Mixin(DatabaseEntity, SharedContractDto)
  implements ISerializedContract
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

  totalSales: number;

  payments: [];

  @decorate(
    ApiProperty({
      type: 'number',
      example: 0,
    })
  )
  totalOrders: number;

  @decorate(
    ApiProperty({
      type: () => SerializedUserDto,
    })
  )
  supplier: ISerializedUser;
}

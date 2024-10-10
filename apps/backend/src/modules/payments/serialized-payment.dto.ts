import {
  ISerializedContract,
  ISerializedPayment,
  ISerializedUser,
} from '@core';
import { decorate, Mixin } from 'ts-mixer';
import { ApiProperty } from '@nestjs/swagger';
import { FormatMoney } from 'format-money-js';
import { SerializedContractDto } from '../contracts/dto/response/serialized-contract.dto';
import { DatabaseEntity } from '../../common/database.entity';
import { SerializedUserDto } from '../users/dto/response/serialized-user.dto';

export class SerializedPaymentDto
  extends DatabaseEntity
  implements ISerializedPayment
{
  @decorate(
    ApiProperty({
      type: 'number',
      example: new FormatMoney().un(33421.233, {
        decimals: 2,
        decimalPoint: '.',
      }),
    })
  )
  amount: number;

  @decorate(
    ApiProperty({
      type: () => SerializedContractDto,
    })
  )
  contract: ISerializedContract;

  @decorate(
    ApiProperty({
      type: () => SerializedUserDto,
    })
  )
  supplier: ISerializedUser;
}

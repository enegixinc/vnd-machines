import {
  ISerializedContract,
  ISerializedPayment,
  ISerializedUser,
} from '@core';
import { decorate } from 'ts-mixer';
import { ApiProperty } from '@nestjs/swagger';
import { SerializedContractDto } from '../contracts/dto/response/serialized-contract.dto';
import { DatabaseEntity } from '../../common/database.entity';
import { SerializedUserDto } from '../users/dto/response/serialized-user.dto';

export class SerializedPaymentDto
  extends DatabaseEntity
  implements ISerializedPayment
{
  @ApiProperty({
    description: 'The amount of money paid',
    example: 500.0,
  })
  amount_paid: number;

  @ApiProperty({
    description: 'The amount of money gained',
    example: 500.0,
  })
  amount_gained: number;

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

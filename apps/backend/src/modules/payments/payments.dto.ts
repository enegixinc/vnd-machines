import { ApiProperty, PickType } from '@nestjs/swagger';
import { CrudValidationGroups } from '@dataui/crud';
import { IsNotEmpty, IsNumber, Validate } from 'class-validator';
import { UserExistsValidator } from '../users/validators/user-exists';
import { IContractEntity, IUserEntity, ReferenceByID } from '@core';
import { SerializedUserDto } from '../users/dto/response/serialized-user.dto';
import { SerializedContractDto } from '../contracts/dto/response/serialized-contract.dto';

const { CREATE } = CrudValidationGroups;

export class CreatePaymentDto {
  @ApiProperty({
    description: 'The ID of the contract for which the payment is made',
    type: () => PickType(SerializedContractDto, ['_id']),
  })
  @IsNotEmpty({ groups: [CREATE] })
  contract: ReferenceByID<IContractEntity>;

  @ApiProperty({
    description: 'The ID of the supplier for which the payment is made',
    type: () => PickType(SerializedUserDto, ['_id']),
  })
  @Validate(UserExistsValidator)
  @IsNotEmpty({ groups: [CREATE] })
  supplier: ReferenceByID<IUserEntity>;

  @ApiProperty({
    description: 'The amount of money paid',
    example: 500,
  })
  @IsNumber()
  @IsNotEmpty({ groups: [CREATE] })
  amount_paid: number;

  @ApiProperty({
    description: 'The amount of money gained',
    example: 500,
  })
  @IsNumber()
  @IsNotEmpty({ groups: [CREATE] })
  amount_gained: number;
}

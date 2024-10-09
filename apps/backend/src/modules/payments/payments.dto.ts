import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@dataui/crud';
import { IsNumber, IsNotEmpty, IsDateString, Validate } from 'class-validator';
import { UserExistsValidator } from '../users/validators/user-exists';
import { ContractExistsValidator } from '../contracts/validators/contract-exist';

const { CREATE } = CrudValidationGroups;

export class CreatePaymentDto {
  @ApiProperty({
    description: 'The ID of the contract for which the payment is made',
  })
  @Validate(ContractExistsValidator)
  @IsNumber()
  @IsNotEmpty({ groups: [CREATE] })
  contract_id: string;

  @ApiProperty({
    description: 'The ID of the supplier for which the payment is made',
  })
  @Validate(UserExistsValidator)
  @IsNumber()
  @IsNotEmpty({ groups: [CREATE] })
  supplier_id: string;

  @ApiProperty({
    description: 'The amount of money paid',
    example: 500,
  })
  @IsNumber()
  @IsNotEmpty({ groups: [CREATE] })
  amount_paid: number;
  @ApiProperty({
    description: 'The date of the payment',
    example: '2024-10-08',
  })
  @IsDateString()
  @IsNotEmpty({ groups: [CREATE] })
  payment_date: Date;
}

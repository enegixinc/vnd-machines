import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@dataui/crud';
import { IsNumber, IsNotEmpty, IsDateString } from 'class-validator';

const { CREATE } = CrudValidationGroups;

export class CreatePaymentDto {
  @ApiProperty({
    description: 'The ID of the contract for which the payment is made',
  })
  @IsNumber()
  @IsNotEmpty({ groups: [CREATE] })
  contract_id: string;
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

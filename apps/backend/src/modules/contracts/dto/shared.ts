import { ContractStatus, FeeType, ISerializedContract } from '@core';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CrudValidationGroups } from '@dataui/crud';

const { CREATE, UPDATE } = CrudValidationGroups;

export class SharedContractDto implements Partial<ISerializedContract> {
  @IsString()
  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    type: 'string',
    default: 'Contract Description',
  })
  description: string;

  @IsNumber()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @ApiProperty({
    type: 'number',
    default: 5.5,
  })
  feePerSale: number;

  @IsEnum(FeeType)
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @ApiProperty({
    enum: FeeType,
    default: FeeType.PERCENTAGE,
  })
  feeType: FeeType;

  @IsDateString()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @ApiProperty({
    type: 'date',
    default: new Date().toISOString(),
  })
  startDate: string;

  @IsDateString()
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @ApiProperty({
    type: 'date',
    default: new Date().toISOString(),
  })
  endDate: string;

  @IsEnum(ContractStatus)
  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    enum: ContractStatus,
    default: ContractStatus.ACTIVE,
  })
  status: ContractStatus;
}
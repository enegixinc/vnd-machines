import { ContractStatus, FeeType, ISerializedContract } from '@core';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CrudValidationGroups } from '@dataui/crud';
import { FileEntity } from '../../files/file.entity';
import { FileDto } from '../../files/file.dto';
import { Type } from 'class-transformer';

const { CREATE, UPDATE } = CrudValidationGroups;

export class SharedContractDto implements Partial<ISerializedContract> {
  @IsString()
  @IsOptional({ groups: [UPDATE, CREATE] })
  @ApiProperty({
    type: 'string',
    default: 'Contract Description',
    required: false,
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
  // @Validate(IsStartDateValidConstraint)
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
  @IsOptional({ groups: [UPDATE] })
  @ApiProperty({
    enum: ContractStatus,
    required: false,
    default: ContractStatus.ACTIVE,
  })
  status: ContractStatus;

  @ApiProperty({
    type: () => FileEntity,
    required: false,
  })
  @IsOptional({ groups: [CREATE, UPDATE] })
  @ValidateNested({ each: true })
  @Type(() => FileDto)
  files: FileEntity[];
}

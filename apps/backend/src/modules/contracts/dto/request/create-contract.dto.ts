import {
  ContractStatus,
  FeeType,
  ICreateContract,
  IUserEntity,
  ReferenceByID,
} from '@core';
import { UserExistsValidator } from '../../../users/validators/user-exists';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { CrudValidationGroups } from '@dataui/crud';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { SerializedUserDto } from '../../../users/dto/response/serialized-user.dto';

const { CREATE, UPDATE } = CrudValidationGroups;

export class CreateContractDto implements ICreateContract {
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

  @Validate(UserExistsValidator)
  @ApiProperty({
    type: () => PickType(SerializedUserDto, ['_id']),
  })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  supplier: ReferenceByID<IUserEntity>;
}

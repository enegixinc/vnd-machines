import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';
import { IDatabaseEntity, IUser, POLICY, UserRole } from '@core';

export class CreateUserDto implements Omit<IUser, keyof IDatabaseEntity> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    minLength: POLICY.AUTH.PASSWORD.MIN_LENGTH,
    maxLength: POLICY.AUTH.PASSWORD.MAX_LENGTH,
  })
  @IsString()
  @MaxLength(POLICY.AUTH.PASSWORD.MAX_LENGTH)
  @IsStrongPassword({
    minLength: POLICY.AUTH.PASSWORD.MIN_LENGTH,
    minLowercase: POLICY.AUTH.PASSWORD.MIN_LOWERCASE,
    minUppercase: POLICY.AUTH.PASSWORD.MIN_UPPERCASE,
    minNumbers: POLICY.AUTH.PASSWORD.MIN_NUMBERS,
    minSymbols: POLICY.AUTH.PASSWORD.MIN_SYMBOLS,
  })
  password: string;

  @ApiProperty({
    enum: UserRole,
    default: UserRole.SUPPLIER,
  })
  @IsEnum(UserRole)
  role: UserRole;
}

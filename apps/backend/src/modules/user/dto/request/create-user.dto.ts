import { ICreateUser, POLICY, UserRole } from '@core';
import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';
import { CrudValidationGroups } from '@dataui/crud';
import { ApiProperty } from '@nestjs/swagger';

const { CREATE, UPDATE } = CrudValidationGroups;

export class CreateUserDto implements ICreateUser {
  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @ApiProperty({
    example: true,
  })
  active: boolean;

  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @ApiProperty({
    type: 'Blob',
  })
  documents: string[];

  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @ApiProperty({
    example: 'email@example.com',
  })
  email: string;

  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @ApiProperty({
    example: 'John',
  })
  @MaxLength(100, { always: true })
  @IsString({
    always: true,
    message: 'First name must be a string',
  })
  firstName: string;

  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @IsString({
    always: true,
    groups: [CREATE, UPDATE],
    message: 'First name must be a string',
  })
  @ApiProperty({
    example: 'Doe',
  })
  @IsNotEmpty({ groups: [CREATE] })
  @MaxLength(100, { always: true })
  lastName: string;

  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @IsStrongPassword({
    minLength: POLICY.AUTH.PASSWORD.MIN_LENGTH,
    minLowercase: POLICY.AUTH.PASSWORD.MIN_LOWERCASE,
    minNumbers: POLICY.AUTH.PASSWORD.MIN_NUMBERS,
    minSymbols: POLICY.AUTH.PASSWORD.MIN_SYMBOLS,
    minUppercase: POLICY.AUTH.PASSWORD.MIN_UPPERCASE,
  })
  @ApiProperty({
    example: 'Password@123',
    minLength: POLICY.AUTH.PASSWORD.MIN_LENGTH,
    maxLength: POLICY.AUTH.PASSWORD.MAX_LENGTH,
  })
  password: string;

  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @ApiProperty({
    example: '+201554891929',
  })
  @IsPhoneNumber()
  phoneNumber: string;

  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @ApiProperty({
    enum: UserRole,
    default: UserRole.SUPPLIER,
    example: UserRole.SUPPLIER,
  })
  role: UserRole;

  @IsOptional({ groups: [UPDATE, CREATE] })
  products: string[];
}

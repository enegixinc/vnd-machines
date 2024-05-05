import { ICreateUser, IDocument, IProduct, POLICY, UserRole } from '@core';
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
import { decorate } from 'ts-mixer';

const { CREATE, UPDATE } = CrudValidationGroups;

export class SharedUserDto {
  @decorate(IsNotEmpty({ groups: [CREATE] }))
  @decorate(IsOptional({ groups: [UPDATE] }))
  @decorate(
    ApiProperty({
      example: true,
      description: 'Is the user active',
      type: Boolean,
    })
  )
  active: boolean;

  @decorate(IsNotEmpty({ groups: [CREATE] }))
  @decorate(IsOptional({ groups: [UPDATE] }))
  @decorate(
    ApiProperty({
      example: 'email@example.com',
      description: 'Email of the user',
      type: String,
    })
  )
  email: string;

  @decorate(IsNotEmpty({ groups: [CREATE] }))
  @decorate(IsOptional({ groups: [UPDATE] }))
  @decorate(
    ApiProperty({
      example: 'John',
      type: String,
    })
  )
  @decorate(MaxLength(100, { always: true }))
  @decorate(
    IsString({
      always: true,
      message: 'First name must be a string',
    })
  )
  firstName: string;

  @decorate(IsNotEmpty({ groups: [CREATE] }))
  @decorate(IsOptional({ groups: [UPDATE] }))
  @decorate(
    IsString({
      always: true,
      groups: [CREATE, UPDATE],
      message: 'First name must be a string',
    })
  )
  @decorate(
    ApiProperty({
      example: 'Doe',
      type: String,
    })
  )
  @decorate(IsNotEmpty({ groups: [CREATE] }))
  @decorate(MaxLength(100, { always: true }))
  lastName: string;

  @decorate(IsNotEmpty({ groups: [CREATE] }))
  @decorate(IsOptional({ groups: [UPDATE] }))
  @decorate(
    ApiProperty({
      example: '+201554891929',
      description: 'Phone number of the user',
      type: String,
    })
  )
  @IsPhoneNumber()
  phoneNumber: string;

  @decorate(IsNotEmpty({ groups: [CREATE] }))
  @decorate(IsOptional({ groups: [UPDATE] }))
  @decorate(
    ApiProperty({
      enum: UserRole,
      default: UserRole.SUPPLIER,
      example: UserRole.SUPPLIER,
      description: 'Role of the user',
      enumName: 'UserRole',
    })
  )
  role: UserRole;
}

export class CreateUserDto extends SharedUserDto implements ICreateUser {
  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      example: '60d7b0f7d7f0b3001f6c3c9d',
      description: 'id of the products',
      type: [String],
    })
  )
  products: string[] | IProduct[];

  @decorate(IsNotEmpty({ groups: [CREATE] }))
  @decorate(IsOptional({ groups: [UPDATE] }))
  @decorate(
    ApiProperty({
      type: [String],
    })
  )
  documents: string[] | IDocument[];

  @decorate(IsNotEmpty({ groups: [CREATE] }))
  @decorate(IsOptional({ groups: [UPDATE] }))
  @decorate(
    IsStrongPassword({
      minLength: POLICY.AUTH.PASSWORD.MIN_LENGTH,
      minLowercase: POLICY.AUTH.PASSWORD.MIN_LOWERCASE,
      minNumbers: POLICY.AUTH.PASSWORD.MIN_NUMBERS,
      minSymbols: POLICY.AUTH.PASSWORD.MIN_SYMBOLS,
      minUppercase: POLICY.AUTH.PASSWORD.MIN_UPPERCASE,
    })
  )
  @decorate(
    ApiProperty({
      example: 'Password@123',
      minLength: POLICY.AUTH.PASSWORD.MIN_LENGTH,
      maxLength: POLICY.AUTH.PASSWORD.MAX_LENGTH,
      type: String,
    })
  )
  password: string;
}

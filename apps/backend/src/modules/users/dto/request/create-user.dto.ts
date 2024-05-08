import { ICreateUser, POLICY } from '@core';
import { IsNotEmpty, IsOptional, IsStrongPassword } from 'class-validator';
import { CrudValidationGroups } from '@dataui/crud';
import { ApiProperty } from '@nestjs/swagger';
import { decorate } from 'ts-mixer';
import { SharedUserDto } from '../shared/shared-user.dto';

const { CREATE, UPDATE } = CrudValidationGroups;

export class CreateUserDto extends SharedUserDto implements ICreateUser {
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

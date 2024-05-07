import { POLICY } from '@core';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: POLICY.AUTH.PASSWORD.MIN_LENGTH,
    minLowercase: POLICY.AUTH.PASSWORD.MIN_LOWERCASE,
    minNumbers: POLICY.AUTH.PASSWORD.MIN_NUMBERS,
    minSymbols: POLICY.AUTH.PASSWORD.MIN_SYMBOLS,
    minUppercase: POLICY.AUTH.PASSWORD.MIN_UPPERCASE,
  })
  password: string;
}

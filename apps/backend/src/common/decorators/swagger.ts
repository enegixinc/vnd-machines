import { ApiProperty } from '@nestjs/swagger';
import { POLICY } from '@core';

export function EmailApiProperty(exampleValue?: string) {
  return function (target: any, propertyKey: string) {
    ApiProperty({
      example: exampleValue ?? 'email@example.com',
    })(target, propertyKey);
  };
}

export function PasswordApiProperty() {
  return function (target: any, propertyKey: string) {
    ApiProperty({
      example: 'Password@123',
      minLength: POLICY.AUTH.PASSWORD.MIN_LENGTH,
      maxLength: POLICY.AUTH.PASSWORD.MAX_LENGTH,
    })(target, propertyKey);
  };
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { IDatabaseEntity, IUser, UserRole } from '@core';

export class CreateUserDtoResponse
  implements Omit<IUser, keyof IDatabaseEntity>
{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsEnum(UserRole)
  role: UserRole;
}

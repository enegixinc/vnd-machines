import { decorate } from 'ts-mixer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  Validate,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserRole } from '@core';
import { CrudValidationGroups } from '@dataui/crud';
import { ProductEntity } from '../../../products/entities/product.entity';
import { Type } from 'class-transformer';

class ReferenceByID {
  @IsString()
  _id: string;
}

const { CREATE, UPDATE } = CrudValidationGroups;

export class SharedUserDto {
  @IsOptional({ groups: [UPDATE, CREATE] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReferenceByID)
  products: ProductEntity[];

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
      uniqueItems: true,
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

  @decorate(IsOptional({ groups: [CREATE, UPDATE] }))
  @decorate(
    ApiProperty({
      example: 'Business Name',
      description: 'Business name of the user',
      type: String,
      nullable: true,
    })
  )
  businessName: string;

  constructor(partial: Partial<SharedUserDto>) {
    Object.assign(this, partial);
  }
}

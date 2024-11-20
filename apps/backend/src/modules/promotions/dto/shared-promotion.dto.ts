import { decorate } from 'ts-mixer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@dataui/crud';
import { ProductEntity } from '../../products/entities/product.entity';
import { Type } from 'class-transformer';
import { MachineEntity } from '../../machines/entities/machine.entity';

const { CREATE, UPDATE } = CrudValidationGroups;

class ReferenceByID {
  @IsString()
  _id: string;
}

export class SharedPromotionDto {
  @IsOptional({ groups: [UPDATE, CREATE] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReferenceByID)
  products: ProductEntity[];

  @IsOptional({ groups: [UPDATE, CREATE] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReferenceByID)
  machines: MachineEntity[];

  // @IsOptional({ groups: [UPDATE, CREATE] })
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => ReferenceByID)
  // categories: CategoryEntity[];

  @decorate(IsNotEmpty({ groups: [CREATE] }))
  @decorate(IsOptional({ groups: [UPDATE] }))
  @decorate(
    ApiProperty({
      description: 'Title of the promotion',
      example: '123123',
      type: String,
    })
  )
  title: string;

  @decorate(IsOptional({ groups: [CREATE, UPDATE] }))
  @decorate(
    ApiProperty({
      description: 'Code of the promotion',
      example: '123123',
      type: String,
    })
  )
  code: string;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({ description: 'Start date of the promotion', type: Date })
  )
  startDate: Date;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({ description: 'End date of the promotion', type: Date })
  )
  endDate: Date;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({ description: 'Start time of the promotion', type: Date })
  )
  startTime: Date;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({ description: 'End time of the promotion', type: Date })
  )
  endTime: Date;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      description: 'Machine associated with the promotion',
      type: String,
      example: 'All Machines',
    })
  )
  machine: string;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(IsBoolean())
  @decorate(
    ApiProperty({
      description: 'Is the promotion percentage-based?',
      type: Boolean,
      example: true,
    })
  )
  percentage: boolean;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      description: 'Type of promotion',
      type: String,
      example: 'happyhour',
    })
  )
  promoType: string;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(IsBoolean())
  @decorate(
    ApiProperty({
      description: 'Is the promotion local?',
      type: Boolean,
      example: true,
    })
  )
  isLocal: boolean;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(IsArray())
  @decorate(
    ApiProperty({
      description: 'Products associated with the promotion',
      type: [String],
      example: ['asd'],
    })
  )
  product: string[];

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(IsNumber())
  @decorate(
    ApiProperty({
      description: 'Amount of discount or promotion value',
      type: Number,
      example: 0.01,
    })
  )
  amount: number;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      description: 'Reference email for promotion',
      type: String,
      example: 'tryvnd@point24h.com',
    })
  )
  referTo: string;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(IsBoolean())
  @decorate(
    ApiProperty({
      description: 'Is the promotion active?',
      type: Boolean,
      example: true,
    })
  )
  active: boolean;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(IsBoolean())
  @decorate(
    ApiProperty({
      description: 'Is the promotion a group promotion?',
      type: Boolean,
      example: true,
    })
  )
  isGroup: boolean;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      description: 'Condition for products to buy',
      type: Number,
      example: 0,
    })
  )
  productsToBuy: number;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      description: 'Category or Product for the promotion',
      type: String,
      example: 'All Products',
    })
  )
  cateOrProd: string;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(IsArray())
  @decorate(
    ApiProperty({
      description: 'Email codes associated with the promotion',
      type: [String],
    })
  )
  emailCode: string[];

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(IsArray())
  @decorate(
    ApiProperty({
      description: 'One-time codes associated with the promotion',
      type: [String],
    })
  )
  oneTimeCode: string[];

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(IsBoolean())
  @decorate(
    ApiProperty({
      description: 'Is this a one-time promotion?',
      type: Boolean,
      example: false,
    })
  )
  isOne: boolean;
}

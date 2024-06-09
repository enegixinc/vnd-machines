import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Validate,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { CrudValidationGroups } from '@dataui/crud';
import { ProductExistsValidator } from '../../../products/validators/product-exists';
import { ProductEntity } from '../../../products/product.entity';
import { MachineEntity } from '../../../machines/entities/machine.entity';
import { Type } from 'class-transformer';
import { MachineExistsValidator } from '../../../machines/validators/product-exists';

const { CREATE, UPDATE } = CrudValidationGroups;

class ProductsFillRequest {
  @Validate(ProductExistsValidator)
  @ApiProperty({
    type: () => PickType(ProductEntity, ['_id']),
  })
  product: ProductEntity;

  @ApiProperty({
    type: 'number',
    example: 1,
  })
  @IsNumber({}, { groups: [CREATE, UPDATE] })
  quantity: number;
}

export class CreateFillRequestDto {
  @IsOptional({ groups: [CREATE, UPDATE] })
  @ApiProperty({
    type: 'string',
    example: 'Some notes',
    required: false,
    nullable: true,
  })
  notes?: string;

  @Validate(MachineExistsValidator)
  @ApiProperty({
    type: () => PickType(MachineEntity, ['_id']),
  })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  machine: MachineEntity;

  @IsNotEmpty({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @ValidateNested({ each: true })
  @ApiProperty({
    type: ProductsFillRequest,
    isArray: true,
  })
  @Type(() => ProductsFillRequest)
  products: ProductsFillRequest[];
}

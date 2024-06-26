import { IsNumber, Validate, ValidateNested } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { ProductExistsValidator } from '../../../products/validators/product-exists';
import { ReferenceByID } from '@core';
import { DatabaseEntity } from '../../../../common/database.entity';
import { Type } from 'class-transformer';
import { ProductHasSupplier } from '../../../products/validators/product-has-supplier';
import { ProductEntity } from '../../../products/entities/product.entity';

class ProductsRequest {
  @ApiProperty({
    type: () => PickType(DatabaseEntity, ['_id']),
  })
  @Validate(ProductHasSupplier)
  @Validate(ProductExistsValidator)
  product: ReferenceByID<ProductEntity>;

  @ApiProperty({
    type: 'number',
    example: 1,
  })
  @IsNumber()
  quantity: number;
}

class NotificationRequest {
  @ApiProperty({
    type: 'boolean',
    example: true,
  })
  email: boolean;

  @ApiProperty({
    type: 'boolean',
    example: true,
  })
  whatsapp: boolean;
}

export class FillRequestDto {
  @ApiProperty({
    type: ProductsRequest,
    isArray: true,
  })
  @Type(() => ProductsRequest)
  @ValidateNested({ each: true, always: true })
  products: ProductsRequest[];

  @ApiProperty({
    type: NotificationRequest,
  })
  @Type(() => NotificationRequest)
  notify: NotificationRequest;
}

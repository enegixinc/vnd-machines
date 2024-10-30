import { decorate, Mixin } from 'ts-mixer';
import { SharedPromotionDto } from './shared-promotion.dto';
import { DatabaseEntity } from '../../../common/database.entity';
import { ApiProperty } from '@nestjs/swagger';
import { MachineEntity } from '../../machines/entities/machine.entity';
import { ProductEntity } from '../../products/entities/product.entity';
import { CategoryEntity } from '../../categories/category.entity';

class ResolvedPromotionDto {
  @decorate(
    ApiProperty({
      description: 'Machine associated with the promotion',
      type: () => MachineEntity,
    })
  )
  machineDetails: MachineEntity;

  @decorate(
    ApiProperty({
      description: 'List of products associated with the promotion',
      type: () => [ProductEntity],
    })
  )
  productDetails: ProductEntity[];

  @decorate(
    ApiProperty({
      description: 'Category associated with the promotion',
      type: () => CategoryEntity,
      required: false,
    })
  )
  categoryDetails: CategoryEntity;
}

export class SerializedPromotionDto extends Mixin(
  DatabaseEntity,
  SharedPromotionDto,
  ResolvedPromotionDto
) {}

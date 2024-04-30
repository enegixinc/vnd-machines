import { ProductEntity } from '../../product.entity';
import { OmitType } from '@nestjs/swagger';

export class CreateProductDto extends OmitType(ProductEntity, [
  '_id',
  'createdAt',
  'updatedAt',
  'deletedAt',
  '__v',
]) {}

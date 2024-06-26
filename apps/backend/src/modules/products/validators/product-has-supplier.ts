import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ProductsService } from '../products.service';
import { ReferenceByID } from '@core';
import { ProductEntity } from '../entities/product.entity';

@ValidatorConstraint({ async: true })
export class ProductHasSupplier implements ValidatorConstraintInterface {
  private product: ProductEntity;
  constructor(private readonly productService: ProductsService) {}
  async validate(where: ReferenceByID<ProductEntity>) {
    this.product = await this.productService.findOne({
      where,
      relations: ['supplier'],
    });
    return !!this.product?.supplier;
  }

  defaultMessage() {
    return `Doesn't have a supplier`;
  }
}

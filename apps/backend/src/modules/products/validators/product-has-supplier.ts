import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ProductEntity } from '../product.entity';
import { ProductsService } from '../products.service';
import { ReferenceByID } from '@core';

@ValidatorConstraint({ async: true })
export class ProductHasSupplier implements ValidatorConstraintInterface {
  private product: ProductEntity;
  constructor(private readonly productService: ProductsService) {}
  async validate(where: ReferenceByID<ProductEntity>) {
    this.product = await this.productService.findOneBy(where);
    return !!this.product?.supplier;
  }

  defaultMessage() {
    return `Doesn't have a supplier`;
  }
}

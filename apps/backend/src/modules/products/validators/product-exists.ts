import { Injectable } from '@nestjs/common';
import { ValidatorConstraint } from 'class-validator';
import { ProductsService } from '../products.service';
import { EntityExistsValidator } from '../../../common/validators/exists.validator';

@Injectable()
@ValidatorConstraint({ async: true })
export class ProductExistsValidator extends EntityExistsValidator {
  constructor(protected readonly productService: ProductsService) {
    super(productService);
  }
}

import { CreateProductDto } from '../request/create-product.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateProductsDto extends PartialType(CreateProductDto) {}

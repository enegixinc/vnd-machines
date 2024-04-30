import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from '../request/create-product.dto';

export class UpdateProductsDto extends PartialType(CreateProductDto) {}

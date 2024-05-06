import { CreateProductDto } from '../request/create-product.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateCategoryDto extends PartialType(CreateProductDto) {}

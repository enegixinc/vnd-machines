import { ICreateBrand } from '@core';
import { SharedBrandDto } from '../shared/shared-brand.dto';

export class CreateBrandDto extends SharedBrandDto implements ICreateBrand {}

import { ICreateCategory } from '@core';
import { SharedCategoryDto } from '../shared/shared-category.dto';

export class CreateCategoryDto
  extends SharedCategoryDto
  implements Readonly<ICreateCategory> {}

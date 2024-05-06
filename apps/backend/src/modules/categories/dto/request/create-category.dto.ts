import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@dataui/crud';
import { decorate } from 'ts-mixer';
import { SharedCategoryDto } from '../shared/shared-category.dto';
import { ICreateCategory } from '@core';

const { CREATE, UPDATE } = CrudValidationGroups;

export class CreateCategoryDto
  extends SharedCategoryDto
  implements ICreateCategory
{
  @decorate(
    ApiProperty({
      type: 'File',
    })
  )
  // @ts-ignore
  categoryPicture: Blob | File;
}

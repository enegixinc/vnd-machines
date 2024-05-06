import { ApiProperty, PickType } from '@nestjs/swagger';
import { CrudValidationGroups } from '@dataui/crud';
import { IsOptional, Validate } from 'class-validator';
import { UserExistsValidator } from '../../../users/validators/user-exists';
import { decorate } from 'ts-mixer';
import { SharedCategoryDto } from '../shared/shared-category.dto';
import { SerializedUserDto } from '../../../users/dto/response/serialized-user.dto';

const { CREATE, UPDATE } = CrudValidationGroups;

export class CreateProductDto extends SharedCategoryDto {
  @decorate(
    ApiProperty({
      type: () => [PickType(SerializedUserDto, ['id'])],
    })
  )
  @decorate(Validate(UserExistsValidator, { each: true }))
  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  suppliers: string[];

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      example: '661c2a7345f6ce15dc3df34e',
      description: 'Brand ID of the product',
      type: String,
    })
  )
  brand: string;

  @decorate(IsOptional({ groups: [UPDATE, CREATE] }))
  @decorate(
    ApiProperty({
      example: '6608a4e9e0cde61fd03f1a81',
      description: 'Category ID of the product',
      type: String,
    })
  )
  category: string;
}

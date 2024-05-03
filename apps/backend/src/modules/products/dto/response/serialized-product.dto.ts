import { Brand, Category, IProduct, ISerializedUser } from '@core';

import { CreateProductDto } from '../request/create-product.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { SerializedUserDto } from '../../../user/dto/response/serialized-user.dto';

export class SerializedProductDto
  extends OmitType(CreateProductDto, ['category', 'brand', 'suppliers'])
  implements IProduct
{
  @ApiProperty({
    example: 1,
    description: 'Version',
    type: Number,
  })
  __v: number;

  @ApiProperty({
    example: '5f4e4e7b0f2891224d5e9b0c',
    description: 'Unique identifier',
    type: String,
  })
  _id: string;

  @ApiProperty({
    example: '2024-05-01T12:00:00.000Z',
    description: 'Creation date of the product',
    type: String,
  })
  createdAt: string;

  @ApiProperty({
    example: null,
    description: 'Deletion date of the product',
    type: String,
  })
  deletedAt: string | null;

  @ApiProperty({
    example: '2024-05-01T12:00:00.000Z',
    description: 'Last sync date of the product',
    type: String,
  })
  updatedAt: string;

  @ApiProperty({
    example: '2024-05-01T12:00:00.000Z',
    description: 'Last sync date of the product',
    type: String,
  })
  category: Category[];

  @ApiProperty({
    example: '2024-05-01T12:00:00.000Z',
    description: 'Last sync date of the product',
    type: String,
  })
  brand: Brand;

  @ApiProperty({
    description: 'Last sync date of the product',
    type: () => [SerializedUserDto],
  })
  suppliers: ISerializedUser[];
}

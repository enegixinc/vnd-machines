import {
  ISerializedBrand,
  ISerializedCategory,
  ISerializedProduct,
  ISerializedUser,
} from '@core';
import { Mixin } from 'ts-mixer';
import { ManualDatabaseEntity } from '../../../../common/database.entity';
import { SharedCategoryDto } from '../shared/shared-category.dto';

export class SerializedCategoryDto
  extends Mixin(ManualDatabaseEntity, SharedCategoryDto)
  implements ISerializedProduct
{
  __v: number;
  brand: ISerializedBrand;
  category: ISerializedCategory[];
  suppliers: ISerializedUser[];
  // @decorate(
  //   ApiProperty({
  //     example: 1,
  //     description: 'Version',
  //     type: Number,
  //   })
  // )
  // __v: number;
  //
  // @decorate(
  //   ApiProperty({
  //     example: '2024-05-01T12:00:00.000Z',
  //     description: 'Last sync date of the product',
  //     type: String,
  //   })
  // )
  // category: ICategory[];
  //
  // @decorate(
  //   ApiProperty({
  //     example: '2024-05-01T12:00:00.000Z',
  //     description: 'Last sync date of the product',
  //     type: String,
  //   })
  // )
  // brand: Brand;
  // @decorate(
  //   ApiProperty({
  //     type: () => [OmitType(SerializedUserDto, ['products'])],
  //   })
  // )
  // suppliers: ISerializedUser[];
}

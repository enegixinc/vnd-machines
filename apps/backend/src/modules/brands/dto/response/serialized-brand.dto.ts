import { ISerializedBrand } from '@core';
import { Mixin } from 'ts-mixer';
import { ManualDatabaseEntity } from '../../../../common/database.entity';
import { SharedBrandDto } from '../shared/shared-brand.dto';

export class SerializedBrandDto
  extends Mixin(ManualDatabaseEntity, SharedBrandDto)
  implements ISerializedBrand
{
  __v: number;
  logo: string;
  picture: string;
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

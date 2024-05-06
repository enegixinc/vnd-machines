import { Entity } from 'typeorm';
import { ICategoryEntity, ISerializedBrand, ISerializedUser } from '@core';
import { ManualDatabaseEntity } from '../../common/database.entity';

@Entity('categories')
export class CategoryEntity
  extends ManualDatabaseEntity
  implements ICategoryEntity
{
  __v: number;
  brands: ISerializedBrand[];
  suppliers: ISerializedUser[];
}

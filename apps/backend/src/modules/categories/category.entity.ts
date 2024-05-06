import { Entity } from 'typeorm';
import { IProductEntity } from '@core';
import { ManualDatabaseEntity } from '../../common/database.entity';

@Entity('categories')
export class CategoryEntity
  extends ManualDatabaseEntity
  implements IProductEntity {}

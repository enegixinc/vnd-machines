import { ICreateMagexCategory } from './magex-category';
import { _IDataBaseEntity } from '../common';
import { ISerializedBrand } from '../brand';
import { ISerializedUser } from '../user';

export type ISerializedCategory = ICategoryResolvedEntities & _IDataBaseEntity;

export type ICategoryCreate = ICreateMagexCategory;

export interface ICategoryResolvedEntities {
  suppliers: ISerializedUser[];
  brands: ISerializedBrand[];
}

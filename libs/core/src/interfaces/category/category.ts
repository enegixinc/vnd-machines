import {
  ICreateMagexCategory,
  ISerializedMagexCategory,
} from './magex-category';
import { _IDataBaseEntity } from '../common';
import { ISerializedBrand } from '../brand';
import { ISerializedUser } from '../user';
import { ISerializedProduct } from '../product';

export interface ICategoryEntity
  extends _IDataBaseEntity,
    Omit<ISerializedCategory, keyof ICreateCategory>,
    ICreateCategory {}

export interface ISerializedCategory
  extends Omit<ISerializedMagexCategory, keyof ICategoryResolvedEntities>,
    _IDataBaseEntity,
    ICategoryResolvedEntities {
  referTo: string;
  // categoryPicture: string;
}

export type ICreateCategory = ICreateMagexCategory;

export interface ICategoryResolvedEntities {
  suppliers: ISerializedUser[];
  brands: ISerializedBrand[];
  products: ISerializedProduct[];
}

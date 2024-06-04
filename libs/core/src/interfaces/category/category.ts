import {
  ICreateMagexCategory,
  ISerializedMagexCategory,
} from './magex-category';
import { IDataBaseEntity } from '../common';
import { ISerializedBrand } from '../brand';
import { ISerializedUser } from '../user';
import { ISerializedProduct } from '../product';

export interface ICategoryEntity
  extends IDataBaseEntity,
    Omit<ISerializedCategory, keyof ICreateCategory>,
    ICreateCategory {}

export interface ISerializedCategory
  extends Omit<ISerializedMagexCategory, keyof ICategoryResolvedEntities>,
    IDataBaseEntity,
    ICategoryResolvedEntities {
  referTo: string;
  // categoryPicture: string;
}

export type ICreateCategory = Omit<
  ICreateMagexCategory,
  'categoryPicture' | 'referTo'
> & {
  categoryPicture?: string;
};

export interface ICategoryResolvedEntities {
  suppliers: ISerializedUser[];
  brands: ISerializedBrand[];
  products: ISerializedProduct[];
}

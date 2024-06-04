import { IDataBaseEntity } from '../common';
import { ISerializedUser } from '../user';
import { ISerializedProduct } from '../product';
import { ISerializedCategory } from '../category';
import { ICreateMagexBrand } from './magex-brand';

export interface IBrandEntity
  extends IDataBaseEntity,
    Omit<ISerializedBrand, keyof ICreateBrand>,
    ICreateBrand {}

export interface ISerializedBrand
  extends ICreateBrand,
    IDataBaseEntity,
    IBrandResolvedEntities {
  referTo: string;
  logo: string;
}

export type ICreateBrand = Omit<
  ICreateMagexBrand,
  'referTo' | 'logo' | 'picture'
> & {
  logo?: string;
  picture?: string;
};

export interface IBrandResolvedEntities {
  suppliers: ISerializedUser[];
  products: ISerializedProduct[];
  categories: ISerializedCategory[];
}

import { _IDataBaseEntity, ReferenceByID } from '../common';
import { ISerializedUser } from '../user';
import { ISerializedProduct } from '../product';
import { ISerializedCategory } from '../category';
import { ICreateMagexBrand } from './magex-brand';

export interface IBrandEntity
  extends _IDataBaseEntity,
    Omit<ISerializedBrand, keyof ICreateBrand>,
    ICreateBrand {}

export interface ISerializedBrand
  extends Omit<ICreateBrand, keyof IBrandResolvedEntities>,
    _IDataBaseEntity,
    IBrandResolvedEntities {
  referTo: string;
  logo: string;
}
export interface ICreateBrand extends ICreateMagexBrand {
  suppliers: ReferenceByID<ISerializedUser>[] | null;
  products: ReferenceByID<ISerializedProduct>[] | null;
  categories: ReferenceByID<ISerializedCategory>[] | null;
}

export interface IBrandResolvedEntities {
  suppliers: ISerializedUser[];
  products: ISerializedProduct[];
  categories: ISerializedCategory[];
}

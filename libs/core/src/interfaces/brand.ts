import { _IMagex_DatabaseEntity, MultiLang, ReferenceByID } from './common';
import { ISerializedUser } from './user';
import { ISerializedProduct } from './product';
import { ICategory } from '@core';

export interface ICreateMagexBrand {
  name: MultiLang;
  referTo: string;
  picture: string;
  logo: string;
  suppliers: ReferenceByID<ISerializedUser>[] | null;
  products: ReferenceByID<ISerializedProduct>[] | null;
  category: ReferenceByID<ICategory>[] | null; // TODO: make it ISerializedCategory
}

export interface IBrand {
  name: MultiLang;
  picture: string;
}

export interface ISerializedBrand
  extends Omit<ICreateMagexBrand, keyof IBrandResolvedEntities>,
    _IMagex_DatabaseEntity {
  referTo: string;
  logo: string;
}

export interface IBrandResolvedEntities {
  suppliers: ISerializedUser[];
  products: ISerializedProduct[];
  category: ICategory[];
}

export type ReferenceFor<T> = T extends {
  id: string;
}
  ? { id: string }
  : T extends { _id: string }
  ? { _id: string }
  : never;

export type ISerializedMagexBrand = _IMagex_DatabaseEntity & ICreateMagexBrand;

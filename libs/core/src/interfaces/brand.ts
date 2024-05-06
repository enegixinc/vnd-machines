import {
  _IDataBaseEntity,
  _IMagex_DatabaseEntity,
  MultiLang,
  ReferenceByID,
} from './common';
import { ISerializedUser } from './user';
import { ISerializedProduct } from './product/product';
import { ISerializedMagexCategory } from './category/magex-category';
import { ISerializedCategory } from './category/category';

export interface ICreateMagexBrand {
  name: MultiLang;
  referTo: string;
  picture: string;
  logo: string;
  suppliers: ReferenceByID<ISerializedUser>[] | null;
  products: ReferenceByID<ISerializedProduct>[] | null;
  category: ReferenceByID<ISerializedMagexCategory>[] | null; // TODO: make it ISerializedCategory
}

export interface IBrand {
  name: MultiLang;
  picture: string;
}

export interface ISerializedBrand
  extends Omit<ICreateMagexBrand, keyof IBrandResolvedEntities>,
    _IDataBaseEntity {
  referTo: string;
  logo: string;
}

export interface IBrandResolvedEntities {
  suppliers: ISerializedUser[];
  products: ISerializedProduct[];
  category: ISerializedCategory[];
}

export type ReferenceFor<T> = T extends {
  id: string;
}
  ? { id: string }
  : T extends { _id: string }
  ? { _id: string }
  : never;

export type ISerializedMagexBrand = _IMagex_DatabaseEntity & ICreateMagexBrand;

import { ISerializedUser } from './user';
import { _IMagex_DatabaseEntity, ReferenceByID } from './common';
import { ISerializedBrand } from './brand';
import {
  ICreateMagexProduct,
  ISerializedMagexProduct,
} from './magex.interfaces';

export interface IProductEntity
  extends ICreateProduct,
    _IMagex_DatabaseEntity {}

export type ISerializedProduct = ISerializedMagexProduct &
  IProductResolvedEntities;

export interface ICreateProduct
  extends Omit<ICreateMagexProduct, keyof IProductResolvedEntities> {
  suppliers: ReferenceByID<ISerializedUser>[];
  brand: ReferenceByID<ISerializedBrand>;
  category: unknown[];
}

export interface IProductResolvedEntities extends _IMagex_DatabaseEntity {
  suppliers: ISerializedUser[];
  brand: ISerializedBrand;
  category: unknown[];
}

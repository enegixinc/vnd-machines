import { ISerializedUser } from '../user';
import { _IDataBaseEntity, ReferenceByID } from '../common';
import { ISerializedBrand } from '../brand';
import { ISerializedCategory, ISerializedMagexCategory } from '../category';
import {
  ICreateMagexProduct,
  IMagexProductResolvedEntities,
  ISerializedMagexProduct,
} from './magex-product';

export interface IProductEntity
  extends _IDataBaseEntity,
    Omit<ISerializedProduct, keyof ICreateProduct>,
    ICreateProduct {}

export interface ISerializedProduct
  extends Omit<ISerializedMagexProduct, keyof IMagexProductResolvedEntities> {
  suppliers: ISerializedUser[];
  brand: ISerializedBrand;
  category: ISerializedCategory[];
  productVideo: string;
}

export interface ICreateProduct
  extends Omit<ICreateMagexProduct, keyof IMagexProductResolvedEntities> {
  suppliers: ReferenceByID<ISerializedUser>[];
  brand: ReferenceByID<ISerializedBrand>;
  category: ReferenceByID<ISerializedMagexCategory>[];
  productVideo: File | Blob;
}

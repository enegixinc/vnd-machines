import { _IMagex_DatabaseEntity, MultiLang } from '@core';
import { ISerializedMagexCategory } from '../category';
import { ISerializedMagexBrand } from '../brand';

export interface ISerializedMagexProduct
  extends IMagexProductResolvedEntities,
    _IMagex_DatabaseEntity {
  name: MultiLang;
  detail: MultiLang;
  keyFeatures: MultiLang;
  include: MultiLang;
  specification: MultiLang;
  description: MultiLang;
  ingredients: MultiLang;
  dimension: Dimension;
  pricePerKilo: boolean;
  upc: string;
  barcode: string;
  price: number;
  referTo: string;
  prodType: string;
  additionPrice: any; // TODO: check type with their backend
  sortIndex: number;
  vatIndex: number;
  virtualProduct: number;
  ageControl: number;
  costPrice: number;
}

export interface IMagexProductResolvedEntities {
  category: ISerializedMagexCategory[];
  brand: ISerializedMagexBrand;
  productPictures: string[];
  productVideo: string;
}

export interface ICreateMagexProduct
  extends Omit<
    ISerializedMagexProduct,
    keyof (IMagexProductResolvedEntities & _IMagex_DatabaseEntity)
  > {
  category: string[];
  brand: string;
  productVideo: Blob | File;
}

export interface Dimension {
  length: number;
  height: number;
  width: number;
}

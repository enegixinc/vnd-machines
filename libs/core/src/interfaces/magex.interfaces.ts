import { _IMagex_DatabaseEntity, ICategory, MultiLang } from '@core';
import { IBrand } from './brand';

export interface ISerializedMagexProduct extends IMagexProductResolvedEntities {
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
  productVideo: string;
  referTo: string;
  prodType: string;
  additionPrice: any; // TODO: check type with their backend
  sortIndex: number;
  vatIndex: number;
  virtualProduct: number;
  ageControl: number;
  costPrice: number;
}

interface IMagexProductResolvedEntities extends _IMagex_DatabaseEntity {
  category: ICategory[];
  brand: IBrand;
  productPictures: string[];
}

export interface ICreateMagexProduct
  extends Omit<ISerializedMagexProduct, keyof IMagexProductResolvedEntities> {
  category: string[];
  brand: string;

  // // TODO: find a better way to handle this
  // image1: string;
  // image2: string;
  // image3: string;
  // image4: string;
  // image5: string;
}

export interface Dimension {
  length: number;
  height: number;
  width: number;
}

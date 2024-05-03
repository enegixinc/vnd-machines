import { ISerializedUser } from './user';

export interface IProduct extends I_MAGEX_Product {
  suppliers: ISerializedUser[];
  deletedAt: string | null;
}

export interface I_MAGEX_Product {
  _id: string;
  name: MultiLang;
  detail: MultiLang;
  keyFeatures: MultiLang;
  include: MultiLang;
  specification: MultiLang;
  description: MultiLang;
  ingredients: MultiLang;
  dimension: Dimension;
  category: Category[];
  productPictures: string[];
  pricePerKilo: boolean;
  upc: string;
  barcode: string;
  price: number;
  productVideo: string;
  referTo: string;
  prodType: string;
  additionPrice: any;
  sortIndex: number;
  vatIndex: number;
  virtualProduct: number;
  ageControl: number;
  brand: Brand;
  __v: number;
  costPrice: any;
  updatedAt: string;
  createdAt: string;
}

export interface MultiLang {
  en?: string;
  ar?: string;
}

export interface Dimension {
  length: number;
  height: number;
  width: number;
}

export interface Category {
  name: MultiLang;
  _id: string;
  categoryPicture: string;
}

export interface Brand {
  name: MultiLang;
  _id: string;
  picture: string;
}

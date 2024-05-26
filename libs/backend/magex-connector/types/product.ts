export interface ICreateMagexProduct {
  name?: string;
  description?: string;
  referTo?: string;
  auto?: boolean;
  upc?: number;
  barcode?: number;
  price?: number;
  costPrice?: number;
  pricePerKilo?: boolean;
  ingredients?: string;
  allergens?: string;
  detail?: string;
  category?: string;
  brand?: string;
  pp?: string;
  length?: number;
  width?: number;
  height?: number;
  ageControl?: number;
  vatIndex?: number;
  virtualProduct?: number;
  sortIndex?: number;
  image1?: Blob | File;
}

export type GetProductResponse = {
  name: Name;
  detail: Detail;
  keyFeatures?: KeyFeatures;
  include?: Include;
  specification?: Specification;
  description: Description;
  ingredients?: Ingredients;
  dimension?: Dimension;
  category: Category[];
  productPictures: string[];
  pricePerKilo: boolean;
  _id: string;
  upc: string;
  barcode?: string;
  price: number;
  productVideo?: string;
  referTo: string;
  prodType: string;
  additionPrice?: number;
  sortIndex?: number;
  vatIndex?: number;
  virtualProduct?: number;
  ageControl?: number;
  brand?: Brand;
  createdAt: string;
  updatedAt: string;
  __v: number;
  costPrice?: number;
  allergens?: Allergens;
}[];

export interface Name {
  ar: string;
  en?: string;
}

export interface Detail {
  ar: string;
}

export interface KeyFeatures {
  en: string;
}

export interface Include {
  en: string;
}

export interface Specification {
  en: string;
}

export interface Description {
  ar: string;
}

export interface Ingredients {
  ar: string;
}

export interface Dimension {
  length: number;
  height: number;
  width: number;
}

export interface Category {
  name: Name2;
  _id: string;
  categoryPicture: string;
}

export interface Name2 {
  ar: string;
}

export interface Brand {
  name: Name3;
  _id: string;
  picture: string;
}

export interface Name3 {
  en: string;
}

export interface Allergens {
  ar: string;
}

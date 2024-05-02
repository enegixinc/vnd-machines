import { Brand, Category, Dimension, IProduct, IUser, MultiLang } from '@core';
import { CreateProductDto } from '../request/create-product.dto';
import { Converter } from './converter';

class MultiLangDto {
  en?: string;
  ar?: string;

  constructor(props: MultiLangDto) {
    Object.assign(this, props);
  }
}

export class ProductConverter extends Converter implements IProduct {
  toMagexProduct(vndProduct: CreateProductDto) {
    const keysWithMultiLang = this.getKeysWithValueType(
      vndProduct,
      MultiLangDto
    );
    const convertedProduct = this.executeConversion(
      vndProduct,
      (multiLang: MultiLang) => JSON.stringify(multiLang),
      (key) => keysWithMultiLang.includes(key)
    );

    return Object.assign(vndProduct, convertedProduct);
  }

  // TODO: check for all languages
  private isMultiLang(obj: MultiLang) {
    return Boolean(obj.en || obj.ar);
  }

  __v: number;
  _id: string;
  additionPrice: any;
  ageControl: number;
  barcode: string;
  brand: Brand;
  category: Category[];
  costPrice: any;
  createdAt: string;
  description: MultiLang;
  detail: MultiLang;
  dimension: Dimension;
  include: MultiLang;
  ingredients: MultiLang;
  keyFeatures: MultiLang;
  name: MultiLang;
  price: number;
  pricePerKilo: boolean;
  prodType: string;
  productPictures: string[];
  productVideo: string;
  referTo: string;
  sortIndex: number;
  specification: MultiLang;
  upc: string;
  updatedAt: string;
  vatIndex: number;
  virtualProduct: number;
  deletedAt: string | null;
  suppliers: IUser[];
}

import { Entity } from 'typeorm';

import { Brand, Category, Dimension, IProduct, MultiLang } from '@core';
import { DatabaseEntity } from '../../common/database.entity';

@Entity()
export class ProductEntity extends DatabaseEntity implements IProduct {
  __v: number;
  _id: string;
  additionPrice: any;
  ageControl: number;
  barcode: string;
  brand: Brand;
  category: Category[];
  costPrice: any;
  description: MultiLang;
  detail: MultiLang;
  dimension: Dimension;
  include: MultiLang;
  ingredients: MultiLang;
  isCreatedByNewSolution: boolean;
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
  supplierId: string;
  upc: string;
  vatIndex: number;
  virtualProduct: number;
}

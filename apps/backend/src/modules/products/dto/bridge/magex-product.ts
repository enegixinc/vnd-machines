import { IProduct } from '@core';
import { ICreateMagexProduct } from '@backend/magex-connector';

export class CreateMagexProduct implements ICreateMagexProduct {
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

  constructor(props: IProduct & { [p: string]: string }) {
    Object.assign(this, props);
  }
}

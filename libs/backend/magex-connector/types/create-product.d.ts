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

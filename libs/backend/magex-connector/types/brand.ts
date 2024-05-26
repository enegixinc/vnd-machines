export interface CreateBrandResponse {
  newBrand: NewBrand;
}

export interface NewBrand {
  _id: string;
  name: Name;
  referTo: string;
  picture: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Name {
  en: string;
}

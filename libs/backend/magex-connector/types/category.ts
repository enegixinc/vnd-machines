interface Category {
  name: any;
  machines: any[];
  _id: string;
  referTo: string;
  categoryPicture: string;
  sortIndex: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type CategoriesByAccountNameResponse = Category[];

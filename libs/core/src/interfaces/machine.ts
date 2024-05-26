export interface GroupsAndMachinesResponse {
  groups: any[];
  machines: Machine[];
}

export interface Machine {
  status: boolean;
  alertSent: boolean;
  machineOnline: boolean;
  machineOnlineAlert: boolean;
  category: any[];
  brand: any[];
  products_bs: any[];
  tax: number;
  group: any[];
  currency: MagexCurrency;
  stock: number;
  languages: Language[];
  time_to_idle: number;
  enablePriceChange: boolean;
  alertEmail: string;
  alertEmail2: string;
  _id: string;
  name: string;
  description: string;
  belongTo: string;
  lane: number;
  laneLength: number;
  height: number;
  slot_height: number;
  step_depth: number;
  step_num: number;
  floor: number;
  model: string;
  tz: Tz;
  themeColor: ThemeColor;
  product: Product[];
  products_price: any[];
  products_plan: any[];
  products_min: ProductsMin[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  stocking: string;
  active: string;
  gui_version: string;
  master_version: string;
  diff: boolean;
  screenSaver: string;
}

export interface MagexCurrency {
  code: string;
  name: string;
  Symbol: string;
}

export interface Language {
  code: string;
  name: string;
  country_code: string;
}

export interface Tz {
  value: string;
  label: string;
  offset: number;
  abbrev: string;
  altName: string;
  tz: boolean;
}

export interface ThemeColor {
  buttons: string;
  secondary: string;
  text: string;
  button: string;
  backgroundImage: any;
  background: string;
  logo: any;
  p_column: string;
  b_column: string;
  c_column: string;
  allProduct: any;
  faq: any[];
  privacy: any[];
  termCondition: any[];
}

export interface Product {
  current_stock: number;
  _id: string;
  id: string;
  max_stock: number;
  upc: string;
  stock: number;
  floor: number;
  lane: number;
  name: string;
  motor: string;
}

export interface ProductsMin {
  _id: string;
  id: string;
  min: number;
  sent: boolean;
  sentzero?: boolean;
}

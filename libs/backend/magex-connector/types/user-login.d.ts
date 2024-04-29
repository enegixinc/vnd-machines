import { MagexConnector } from '../gen';

export interface LoginResponse {
  result: Result;
  accessToken: string;
  refreshToken: string;
  needFullAccessUser: boolean;
  need_mfa: boolean;
}

export interface Result {
  features: Features;
  limits: Limits;
  role: string;
  fullAccess: boolean;
  resetLink: string;
  count: number;
  theme: string;
  group: any[];
  langs: any[];
  lang1: string;
  lang2: string;
  lang3: string;
  mfa: boolean;
  currency: Currency;
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  email2: any;
  dba: boolean;
  stocking: number;
  stocking_write: boolean;
  referTo: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Features {
  additionPrice: boolean;
  disablePromo: boolean;
  disableMR: boolean;
  extra: boolean;
  disableAudio: boolean;
  disablePlanogram: boolean;
  disableAlert: boolean;
  advanced: boolean;
  temperature: boolean;
  alertCustomization: boolean;
  badges: boolean;
  proposal: boolean;
}

export interface Limits {
  view_proposal: boolean;
  edit_proposal: boolean;
  view_stock: boolean;
  view_machine: boolean;
  edit_machine: boolean;
  view_prod: boolean;
  edit_prod: boolean;
  view_cate: boolean;
  edit_cate: boolean;
  view_brand: boolean;
  edit_brand: boolean;
  view_receipt: boolean;
  edit_receipt: boolean;
  view_ss: boolean;
  edit_ss: boolean;
  edit_group: boolean;
  edit_user: boolean;
  view_plano: boolean;
  edit_plano: boolean;
  view_promo: boolean;
  edit_promo: boolean;
  view_report: boolean;
  view_trans: boolean;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

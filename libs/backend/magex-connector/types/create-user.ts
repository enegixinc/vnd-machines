export interface CreateUserBody {
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  role: string;
  addedToAdmin: string;
  fullAccess: boolean;
  mfa: boolean;
  limits: Limits;
  features: Features;
  theme: string;
  stocking: boolean;
  stocking_write: boolean;
  langs: any[];
  dba: boolean;
  email2: any;
  currency: Currency;
  lang1: string;
  lang2: string;
  lang3: string;
}

export interface Limits {
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
  view_proposal: boolean;
  edit_proposal: boolean;
  view_report: boolean;
  view_trans: boolean;
}

export interface Features {
  additionPrice: boolean;
  disablePromo: boolean;
  disableMR: boolean;
  extra: boolean;
  temperature: boolean;
  disableAudio: boolean;
  disablePlanogram: boolean;
  disableAlert: boolean;
  advanced: boolean;
  badges: boolean;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

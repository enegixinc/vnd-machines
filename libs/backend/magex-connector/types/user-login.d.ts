import { Currency, Features, Limits } from './create-user';

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

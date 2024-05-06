import { _IMagex_DatabaseEntity, MultiLang } from '@core';

export type ISerializedMagexBrand = _IMagex_DatabaseEntity & ICreateMagexBrand;

export interface ICreateMagexBrand {
  name: MultiLang;
  referTo: string;
  picture: string;
  logo: string;
}

import { _IMagex_DatabaseEntity, MultiLang } from '@core';

export interface ISerializedMagexCategory
  extends Omit<ICreateMagexCategory, keyof IMagexCategoryResolvedEntities>,
    _IMagex_DatabaseEntity {}

export interface ICreateMagexCategory extends IMagexCategoryResolvedEntities {
  name: MultiLang;
  referTo: string;
  auto: boolean;
  sortIndex: number;
}

export interface IMagexCategoryResolvedEntities {
  categoryPicture: Blob | File;
}

export interface MultiLang {
  en?: string;
  ar?: string;
}

export interface _IMagex_DatabaseEntity {
  _id: string;
  __v: number;
  updatedAt: string;
  createdAt: string;
}

export type _IDataBaseEntity = _IMagex_DatabaseEntity;

export type ReferenceByID<T> = T extends {
  _id: string;
}
  ? { _id: string }
  : T extends { id: string }
  ? { id: string }
  : never;

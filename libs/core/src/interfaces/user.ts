import { ISerializedProduct } from './product';
import { IDataBaseEntity } from './common';

export interface ISerializedUser
  extends Omit<IUserEntity, 'password' | keyof IUserResolvedEntities> {
  products: ISerializedProduct[];
  documents: IDocument[];
}

interface IUserResolvedEntities {
  products: ISerializedProduct[];
  documents: IDocument[];
}

export interface IUserEntity extends IDataBaseEntity {
  firstName: string;
  lastName: string;
  businessName: string | null;
  email: string;
  password: string;
  role: UserRole;
  phoneNumber: string;
  active: boolean;
}

export type ICreateUser = Omit<
  IUserEntity,
  keyof (IDataBaseEntity & IUserResolvedEntities & 'password')
>;

export interface IDocument {
  id: string;
  name: string;
  url: string;
  mimeType: string;
  size: number;
  deletedAt?: Date;
}

export enum UserRole {
  ADMIN = 'admin',
  SUPPLIER = 'supplier',
}

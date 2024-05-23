import { ISerializedProduct } from './product';
import { IDataBaseEntity } from './common';
import { ISerializedContract } from './contract';

export interface ISerializedUser
  extends Omit<IUserEntity, 'password' | keyof IUserResolvedEntities>,
    IUserResolvedEntities {}

interface IUserResolvedEntities {
  products: ISerializedProduct[];
  documents: IDocument[];
  contracts: ISerializedContract[];
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
  products: string[] | ISerializedProduct[];
  documents: string[] | IDocument[];
  contracts: string[] | ISerializedContract[];
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

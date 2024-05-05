import { IDatabaseEntity } from './database-entity';
import { IProduct } from './product';

export interface ISerializedUser
  extends Omit<IUserEntity, 'password' | keyof IUserResolvedEntities> {
  products: IProduct[];
  documents: IDocument[];
}

interface IUserResolvedEntities {
  products: IProduct[];
  documents: IDocument[];
}

export interface IUserEntity extends IDatabaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  phoneNumber: string;
  active: boolean;
  products: string[] | IProduct[];
  documents: string[] | IDocument[];
}

export type ICreateUser = Omit<IUserEntity, keyof IDatabaseEntity>;

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

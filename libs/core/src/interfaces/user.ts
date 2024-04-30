import { IDatabaseEntity } from './database-entity';

export interface IUser extends IDatabaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  phoneNumber: string;
  active: boolean;
  documents?: IDocument[];
}

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

export interface Supplier extends IUser {
  products: string[];
}

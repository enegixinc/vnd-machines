import { IDatabaseEntity } from './database-entity';

export interface IUser extends IDatabaseEntity {
  email: string;
  password: string;
  role: UserRole;
}

export enum UserRole {
  ADMIN = 'admin',
  SUPPLIER = 'supplier',
}

export interface Supplier extends IUser {
  products: string[];
}

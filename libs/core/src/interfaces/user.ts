import { IDatabaseEntity } from './database-entity';

export interface IUser extends IDatabaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  phoneNumber: string;
  active: boolean;
  deletedAt?: Date;
}

export enum UserRole {
  ADMIN = 'admin',
  SUPPLIER = 'supplier',
}

export interface Supplier extends IUser {
  products: string[];
}

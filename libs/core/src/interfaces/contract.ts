import {
  IDataBaseEntity,
  ISerializedUser,
  IUserEntity,
  ReferenceByID,
} from '@core';

export interface ICreateContract {
  startDate: string;
  endDate: string;
  description: string;
  feePerSale: number;
  feeType: FeeType;
  supplier: ReferenceByID<IUserEntity>;
  status: ContractStatus;
}

export interface ICreatePayment {
  amount_paid: number;
  amount_gained: number;
  supplier: ReferenceByID<IUserEntity>;
  contract: ReferenceByID<IContractEntity>;
}

export interface IContractComputedFields {
  totalOrders: number;
  totalRevenue: number;
}

export interface ISerializedContract
  extends IContractEntity,
    IContractComputedFields {
  activeRevenue: any;
  supplier: ISerializedUser;
}

export type ISerializedPayment = IPaymentEntity;

export enum ContractStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  TERMINATED = 'terminated',
}

export enum FeeType {
  PERCENTAGE = 'percentage',
  FIXED = 'fixed',
}

export interface IContractEntity
  extends IDataBaseEntity,
    ICreateContract,
    IContractComputedFields {}

export interface IPaymentEntity extends IDataBaseEntity, ICreatePayment {}

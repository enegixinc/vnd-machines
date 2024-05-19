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

export interface IContractComputedFields {
  totalSales: number;
  totalRevenue: number;
}

export interface ISerializedContract
  extends IContractEntity,
    IContractComputedFields {
  supplier: ISerializedUser;
}

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

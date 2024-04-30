export interface IDatabaseEntity {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt?: Date | string;
}

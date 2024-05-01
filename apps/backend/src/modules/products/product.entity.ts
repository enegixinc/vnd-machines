import { Entity, PrimaryColumn } from 'typeorm';
import { IUser } from '@core';
import { DatabaseEntity } from '../../common/database.entity';
import { OmitType } from '@nestjs/swagger';
import { CrudValidationGroups } from '@dataui/crud';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity()
export class ProductEntity extends OmitType(DatabaseEntity, ['id']) {
  @PrimaryColumn()
  __id: string;
  suppliers: IUser[];
}

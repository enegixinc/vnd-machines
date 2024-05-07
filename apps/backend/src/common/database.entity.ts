import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IDataBaseEntity } from '@core';
import { ApiProperty } from '@nestjs/swagger';
import { decorate } from 'ts-mixer';

export class DatabaseEntity extends BaseEntity implements IDataBaseEntity {
  @decorate(
    ObjectIdColumn({
      generated: false,
      unique: true,
      type: 'varchar',
      default: () => 'gen_random_uuid()',
    })
  )
  @decorate(
    ApiProperty({
      example: '6a909236-53f2-4727-b780-e41e115ee906',
      type: 'string',
    })
  )
  _id: string;

  @decorate(
    ApiProperty({
      example: 1,
      description: 'Version',
      type: Number,
    })
  )
  @decorate(
    Column({
      type: 'int',
      default: 1,
    })
  )
  __v: number;

  @decorate(
    CreateDateColumn({
      generated: false,
    })
  )
  @decorate(
    ApiProperty({
      example: '2021-07-01T00:00:00.000Z',
      type: 'date',
    })
  )
  createdAt: string;

  @decorate(
    UpdateDateColumn({
      generated: false,
    })
  )
  @decorate(
    ApiProperty({
      example: '2021-07-01T00:00:00.000Z',
      type: 'date',
    })
  )
  updatedAt: string;

  @decorate(DeleteDateColumn())
  @decorate(
    ApiProperty({
      example: '2021-07-01T00:00:00.000Z',
      type: 'date',
    })
  )
  deletedAt: string | null;

  @decorate(
    Column({
      type: 'date',
      nullable: true,
      default: () => 'CURRENT_TIMESTAMP',
    })
  )
  @decorate(
    ApiProperty({
      example: '2021-07-01T00:00:00.000Z',
      type: 'date',
    })
  )
  lastSyncAt: string;
}

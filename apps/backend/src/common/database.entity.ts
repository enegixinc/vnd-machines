import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IDatabaseEntity } from '@core';
import { ApiProperty } from '@nestjs/swagger';
import { decorate } from 'ts-mixer';

export class DatabaseEntity extends BaseEntity implements IDatabaseEntity {
  @decorate(PrimaryGeneratedColumn('uuid'))
  @decorate(
    ApiProperty({
      example: '123e4567-e89b-12d3-a456-426614174000',
      type: 'uuid',
    })
  )
  id: string;

  @decorate(CreateDateColumn())
  @decorate(
    ApiProperty({
      example: '2021-07-01T00:00:00.000Z',
      type: 'timestamp',
    })
  )
  createdAt: string;

  @UpdateDateColumn()
  @ApiProperty({
    example: '2021-07-01T00:00:00.000Z',
    type: 'timestamp',
  })
  updatedAt: string;

  @decorate(DeleteDateColumn())
  @decorate(
    ApiProperty({
      example: '2021-07-01T00:00:00.000Z',
      type: 'timestamp',
    })
  )
  deletedAt: string | null;
}

export class ManualDatabaseEntity {
  @decorate(
    ObjectIdColumn({
      generated: false,
      unique: true,
      name: '_id',
      type: 'varchar',
    })
  )
  @decorate(
    ApiProperty({
      example: '60d7b0f7d7f0b3001f6c3c9d',
      type: 'objectId',
    })
  )
  _id: string;

  @decorate(
    CreateDateColumn({
      generated: false,
    })
  )
  @decorate(
    ApiProperty({
      example: '2021-07-01T00:00:00.000Z',
      type: 'timestamp',
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
      type: 'timestamp',
    })
  )
  updatedAt: string;

  @decorate(DeleteDateColumn())
  @decorate(
    ApiProperty({
      example: '2021-07-01T00:00:00.000Z',
      type: 'timestamp',
    })
  )
  deletedAt: string | null;
}

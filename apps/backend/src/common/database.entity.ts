import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IDatabaseEntity } from '@core';
import { ApiProperty, OmitType } from '@nestjs/swagger';
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
  createdAt: Date | string;

  @UpdateDateColumn()
  @ApiProperty({
    example: '2021-07-01T00:00:00.000Z',
    type: 'timestamp',
  })
  updatedAt: Date | string;

  @decorate(DeleteDateColumn())
  @decorate(
    ApiProperty({
      example: '2021-07-01T00:00:00.000Z',
      type: 'timestamp',
    })
  )
  deletedAt: Date | string | null;
}

export class _DatabaseEntity extends OmitType(DatabaseEntity, ['id']) {
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
}

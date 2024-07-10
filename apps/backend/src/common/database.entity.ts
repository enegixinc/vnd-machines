import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Index,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { _IMagex_DatabaseEntity, IDataBaseEntity } from '@core';
import { ApiProperty } from '@nestjs/swagger';
import { decorate } from 'ts-mixer';
import { MagexService } from '../services/magex/magex.service';

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
      nullable: true,
    })
  )
  deletedAt: string | null;

  @decorate(
    Column({
      type: 'timestamp',
      nullable: true,
    })
  )
  @decorate(
    ApiProperty({
      example: '2021-07-01T00:00:00.000Z',
      type: 'date',
      nullable: true,
    })
  )
  lastSyncAt: string | null;

  @decorate(
    Column({
      generated: false,
      type: 'varchar',
      nullable: true,
    })
  )
  @decorate(
    ApiProperty({
      example: '6a909236-53f2-4727-b780-e41e115ee906',
      type: 'string',
    })
  )
  createdBy: string;
}

export abstract class MagexDatabaseEntity extends DatabaseEntity {
  abstract createMagexRecord(magexService: MagexService): Promise<void>;
  abstract updateMagexRecord(magexService: MagexService): Promise<void>;
  abstract deleteMagexRecord(magexService: MagexService): Promise<void>;
  abstract fetchMagexRecords(
    magexService: MagexService
  ): Promise<_IMagex_DatabaseEntity[]>;

  protected base64ToBlob(base64: string): Blob {
    const mimeType = base64.split(',')[0].split(':')[1].split(';')[0];
    const byteString = atob(base64.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeType });
  }
}

export class SearchableEntity extends DatabaseEntity {
  @Index()
  @Column({ type: 'varchar' })
  fullName: string;

  @Index({ fulltext: true })
  @Column({ type: 'varchar' })
  searchableText: string;
}

export abstract class SearchableMagexEntity extends MagexDatabaseEntity {
  @Index()
  @Column({ type: 'varchar', default: 'DEFAULT_FULLNAME' })
  fullName: string;

  @Index({ fulltext: true })
  @Column({ type: 'varchar', default: 'DEFAULT' })
  searchableText: string;
}

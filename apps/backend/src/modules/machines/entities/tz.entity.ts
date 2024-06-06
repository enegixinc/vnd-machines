import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Tz {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  value: string;

  @ApiProperty()
  @Column()
  label: string;

  @ApiProperty()
  @Column()
  offset: number;

  @ApiProperty()
  @Column()
  abbrev: string;

  @ApiProperty()
  @Column()
  altName: string;

  @ApiProperty()
  @Column()
  tz: boolean;
}

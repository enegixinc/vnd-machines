// entities/language.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Language {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  code: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  country_code: string;
}

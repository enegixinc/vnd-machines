// entities/themeColor.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ThemeColor {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  buttons: string;

  @ApiProperty()
  @Column()
  secondary: string;

  @ApiProperty()
  @Column()
  text: string;

  @ApiProperty()
  @Column()
  button: string;

  @ApiProperty()
  @Column()
  backgroundImage: string;

  @ApiProperty()
  @Column()
  background: string;

  @ApiProperty()
  @Column()
  logo: string;

  @ApiProperty()
  @Column()
  p_column: string;

  @ApiProperty()
  @Column()
  b_column: string;

  @ApiProperty()
  @Column()
  c_column: string;

  @ApiProperty()
  @Column()
  allProduct: string;

  @ApiProperty()
  @Column('simple-array')
  faq: string[];

  @ApiProperty()
  @Column('simple-array')
  privacy: string[];

  @ApiProperty()
  @Column('simple-array')
  termCondition: string[];
}

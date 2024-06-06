import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ProductsMin {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  _id: string;

  @ApiProperty()
  @Column()
  min: number;

  @ApiProperty()
  @Column()
  sent: boolean;

  @ApiProperty()
  @Column()
  sentzero: boolean;
}

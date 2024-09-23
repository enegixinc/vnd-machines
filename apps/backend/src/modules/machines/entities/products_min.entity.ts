import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { MachineEntity } from './machine.entity';

@Entity()
export class ProductsMin {
  @PrimaryColumn()
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Column({
    type: 'text',
  })
  id: number;

  @ApiProperty()
  @Column()
  min: number;

  @ApiProperty()
  @Column()
  sent: boolean;

  @ApiProperty()
  @Column()
  sentzero: boolean;

  @ManyToOne(() => MachineEntity, (machine) => machine.products_min)
  machine: MachineEntity;
}

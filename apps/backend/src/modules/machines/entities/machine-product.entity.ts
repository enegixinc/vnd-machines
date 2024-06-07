// entities/product.entity.ts
import { Column, Entity, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { DatabaseEntity } from '../../../common/database.entity';
import { ProductEntity } from '../../products/product.entity';
import { Type } from 'class-transformer';
import { MachineEntity } from './machine.entity';

@Entity()
export class MachineProduct extends DatabaseEntity {
  @ManyToOne(() => ProductEntity, (product) => product.machines)
  @Type(() => ProductEntity)
  product: ProductEntity;

  @ManyToOne(() => MachineEntity, (machine) => machine.product)
  @Type(() => MachineEntity)
  machine: MachineEntity;

  @ApiProperty()
  @Column()
  current_stock: number;

  @ApiProperty()
  @Column()
  max_stock: number;

  @ApiProperty()
  @Column()
  upc: string;

  @ApiProperty()
  @Column()
  stock: number;

  @ApiProperty()
  @Column()
  floor: number;

  @ApiProperty()
  @Column()
  lane: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  motor: string;

  @ApiProperty()
  @Column({
    nullable: true,
  })
  expiration_date: Date;
}
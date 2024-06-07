import { DatabaseEntity } from '../../common/database.entity';
import {
  ChildEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  TableInheritance,
} from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { MachineEntity } from '../machines/entities/machine.entity';
import { ProductEntity } from '../products/product.entity';

export enum RequestType {
  FILL = 'fill',
}

@Entity()
@TableInheritance({
  column: {
    type: 'varchar',
    name: 'type',
  },
})
export class RequestEntity extends DatabaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.requests)
  issuedTo: UserEntity;

  @Column()
  notes?: string;

  @Column({
    default: false,
  })
  informed: boolean;

  // requestType: RequestType;
}

@ChildEntity(RequestType.FILL)
export class FillRequestEntity extends RequestEntity {
  @ManyToOne(() => MachineEntity, (machine) => machine.requests)
  machine: MachineEntity;

  @ManyToMany(() => ProductEntity, (product) => product.requests)
  products: ProductEntity[];

  @Column({
    default: false,
  })
  accepted: boolean;
}

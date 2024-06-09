import { DatabaseEntity } from '../../../common/database.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { MachineEntity } from '../../machines/entities/machine.entity';
import { ProductEntity } from '../../products/product.entity';

@Entity('fill_requests')
export class FillRequestEntity extends DatabaseEntity {
  @ManyToOne(() => MachineEntity, (machine) => machine.fillRequests)
  machine: MachineEntity;

  @OneToMany(
    () => FillRequestProducts,
    (fillRequestProducts) => fillRequestProducts.fillRequest,
    { cascade: true }
  )
  fillRequestProducts: FillRequestProducts[];

  @Column({ default: false })
  accepted: boolean;

  @Column({ nullable: true })
  notes?: string;

  @Column({ default: false })
  receivedMail: boolean;
}

@Entity('fill_requests_products')
export class FillRequestProducts extends DatabaseEntity {
  @ManyToOne(
    () => FillRequestEntity,
    (fillRequest) => fillRequest.fillRequestProducts
  )
  fillRequest: FillRequestEntity;

  @ManyToOne(() => ProductEntity, (product) => product.fillRequestProducts)
  product: ProductEntity;

  @Column()
  quantity: number;
}

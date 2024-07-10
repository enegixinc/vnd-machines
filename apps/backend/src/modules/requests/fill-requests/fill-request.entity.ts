import { DatabaseEntity } from '../../../common/database.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { MachineEntity } from '../../machines/entities/machine.entity';
import { ProductEntity } from '../../products/entities/product.entity';

@Entity('fill_requests')
export class FillRequestEntity extends DatabaseEntity {
  @ManyToOne(() => MachineEntity, (machine) => machine.fillRequests)
  machine: MachineEntity;

  @OneToMany(
    () => FillRequestProducts,
    (fillRequestProducts) => fillRequestProducts.fillRequest,
    {
      cascade: true,
    }
  )
  products: FillRequestProducts[];

  @Column({ nullable: true })
  notes?: string;

  @Column({ default: false })
  receivedMail: boolean;
}

@Entity('fill_requests_products')
export class FillRequestProducts extends DatabaseEntity {
  @ManyToOne(() => FillRequestEntity, (fillRequest) => fillRequest.products, {})
  @JoinColumn({ name: 'fill_request_id' })
  fillRequest: FillRequestEntity;

  @ManyToOne(() => ProductEntity, (product) => product.fillRequestProducts)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @Column()
  product_id: string;

  @Column({ type: 'jsonb', nullable: true })
  deletedProduct: any;

  @Column()
  quantity: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  supplier_id: string;
}

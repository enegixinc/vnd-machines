import { Column, Entity, ManyToOne } from 'typeorm';
import { DatabaseEntity } from '../../common/database.entity';
import { ContractEntity } from '../contracts/entities/contract.entity';

@Entity('files')
export class FileEntity extends DatabaseEntity {
  @Column({ nullable: false })
  filename: string;

  @Column({ nullable: false })
  originalname: string;

  @Column({ nullable: false })
  size: number;

  @Column({ nullable: false })
  url: string;

  @ManyToOne(() => ContractEntity, (contract) => contract.files)
  contract: ContractEntity;
}

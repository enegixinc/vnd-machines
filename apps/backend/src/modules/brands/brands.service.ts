import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { BrandEntity } from './brand.entity';
import { magexClient } from '../../services/external-api';

@Injectable()
export class BrandsService extends TypeOrmCrudService<BrandEntity> {
  constructor(
    @InjectRepository(BrandEntity) repository: Repository<BrandEntity>
  ) {
    super(repository);
  }

  protected sync() {
    magexClient.brands.getBrandsByAccountName({
      accountName: 'tryvnd',
    });
  }
}

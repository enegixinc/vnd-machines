import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { PromotionEntity } from './promotion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PromotionsService extends TypeOrmCrudService<PromotionEntity> {
  constructor(
    @InjectRepository(PromotionEntity) repository: Repository<PromotionEntity>
  ) {
    super(repository);
  }
}

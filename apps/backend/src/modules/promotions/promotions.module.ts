import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MachineEntity } from '../machines/entities/machine.entity';
import { CategoryEntity } from '../categories/category.entity';
import { PromotionEntity } from './promotion.entity';
import { PromotionsController } from './promotions.controller';
import { PromotionsService } from './promotions.service';
import { PromotionSubscriber } from './promotions.subsriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([MachineEntity, CategoryEntity, PromotionEntity]),
  ],
  controllers: [PromotionsController],
  providers: [PromotionsService, PromotionSubscriber],
})
export class PromotionsModule {}

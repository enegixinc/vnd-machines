import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryEntity } from './category.entity';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { UserEntity } from '../users/entities/user.entity';
import { CategorySubscriber } from './category.subscriber';
import { PromotionEntity } from '../promotions/promotion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity, UserEntity, PromotionEntity]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategorySubscriber],
})
export class CategoriesModule {}

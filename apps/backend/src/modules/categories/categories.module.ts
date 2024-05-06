import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryEntity } from './category.entity';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { UserEntity } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, UserEntity])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}

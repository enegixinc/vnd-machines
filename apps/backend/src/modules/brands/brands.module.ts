import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BrandEntity } from './brand.entity';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { UserEntity } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BrandEntity, UserEntity])],
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}

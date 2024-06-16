import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { UserEntity } from '../users/entities/user.entity';
import { ProductSubscriber } from './products.subscriber';
import { ProductEntity } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, UserEntity])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductSubscriber],
  exports: [ProductsService],
})
export class ProductsModule {}

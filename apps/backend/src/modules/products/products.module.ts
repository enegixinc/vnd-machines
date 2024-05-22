import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductEntity } from './product.entity';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, UserEntity])],
  controllers: [ProductsController],
  providers: [ProductsService, UsersService],
})
export class ProductsModule {}

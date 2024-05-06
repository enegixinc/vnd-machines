import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ProductEntity } from '../products/product.entity';
import { UserExistsValidator } from './validators/user-exists';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, UserEntity])],
  controllers: [UsersController],
  providers: [UsersService, UserExistsValidator],
})
export class UsersModule {}

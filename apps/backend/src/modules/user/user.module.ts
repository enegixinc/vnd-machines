import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ProductEntity } from '../products/product.entity';
import { UserExistsValidator } from './validators/user-exists';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, UserEntity])],
  controllers: [UserController],
  providers: [UserService, UserExistsValidator],
})
export class UserModule {}

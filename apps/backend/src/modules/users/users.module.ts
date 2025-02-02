import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './entities/user.entity';
import { UserEntitySubscriber, UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ProductEntity } from '../products/entities/product.entity';
import { UserExistsValidator } from './validators/user-exists';
import { ContractEntity } from '../contracts/entities/contract.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, UserEntity, ContractEntity]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserExistsValidator, UserEntitySubscriber],
  exports: [UsersService, UserExistsValidator],
})
export class UsersModule {}

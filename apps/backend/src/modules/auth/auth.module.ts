import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';
import { HashingModule } from '../../common/hashing/hashing.module';
import { HashingService } from '../../common/hashing/hashing.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { RefreshStrategy } from './strategies/refresh.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    HashingService,

    JwtStrategy,
    LocalStrategy,
    RefreshStrategy,
  ],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule,
    HashingModule,
    PassportModule,
  ],
})
export class AuthModule {}

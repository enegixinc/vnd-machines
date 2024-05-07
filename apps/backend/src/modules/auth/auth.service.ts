import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(loginDto: LoginDto): Promise<UserEntity> {
    const user: UserEntity = await this.usersService.findOne({
      where: { email: loginDto.email },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    console.log(user);

    const isMatch: boolean = bcrypt.compareSync(
      loginDto.password,
      user.password
    );
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }
    return user;
  }

  async login(
    user: UserEntity
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { id: user._id };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '7 days' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '30 days' }),
    };
  }
}

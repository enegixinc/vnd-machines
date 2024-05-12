import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { HashingService } from '../../common/hashing/hashing.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly hashingService: HashingService
  ) {}
  async login(loginDto: LoginDto) {
    const user = await this.userService.findOneBy({ email: loginDto.email });

    if (!user) throw new NotFoundException('User not found');

    const isValidPassword = await this.hashingService.compare(
      loginDto.password,
      user.password
    );

    if (!isValidPassword) throw new NotFoundException('Invalid password');

    const payload = { email: user.email, sub: user._id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

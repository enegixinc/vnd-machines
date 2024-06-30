import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { HashingService } from '../../common/hashing/hashing.service';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { UserEntity } from '../users/entities/user.entity';
import { ConfigService } from '@backend/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly hashingService: HashingService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService
  ) {}

  private async generateTokens(user: UserEntity) {
    const atPayload = { email: user.email, sub: user._id, role: user.role };
    const rtPayload = { sub: user._id };

    const accessToken = this.jwtService.sign(atPayload, {
      expiresIn: '5m',
      secret: this.configService.get('JWT_ACCESS_SECRET'),
    });
    const refreshToken = this.jwtService.sign(rtPayload, {
      expiresIn: '30d',
      secret: this.configService.get('JWT_REFRESH_SECRET'),
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private async storeRefreshToken(userId: string, refreshToken: string) {
    const redisClient = this.redisService.getClient();
    await redisClient.set(`refresh-token:${userId}`, refreshToken);
  }

  async validateUser(loginDto: LoginDto) {
    const user = await this.userService.findOneBy({ email: loginDto.email });

    if (!user) throw new NotFoundException('User not found');

    const isValidPassword = await this.hashingService.compare(
      loginDto.password,
      user.password
    );

    if (!isValidPassword) throw new NotFoundException('Invalid password');

    return user;
  }

  async login(user: UserEntity) {
    const tokens = await this.generateTokens(user);
    await this.storeRefreshToken(user._id, tokens.refreshToken);

    return tokens;
  }

  async validateRefreshToken(userId: string, refreshToken: string) {
    const redisClient = this.redisService.getClient();
    const storedRefreshToken = await redisClient.get(`refresh-token:${userId}`);

    if (storedRefreshToken !== refreshToken) {
      throw new NotFoundException('Invalid refresh token');
    }

    const user = await this.userService.findOneBy({ _id: userId });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async logout(userId: string) {
    const redisClient = this.redisService.getClient();
    await redisClient.del(`refresh-token:${userId}`);
  }

  async me(userId: string) {
    return await this.userService.findOne({
      where: { _id: userId },
      cache: 2000,
    });
  }
}

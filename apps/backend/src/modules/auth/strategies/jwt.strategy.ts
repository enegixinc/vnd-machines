import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { ConfigService } from '@backend/config';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    readonly configService: ConfigService,
    private readonly userService: UsersService
  ) {
    const extractors = [ExtractJwt.fromAuthHeaderAsBearerToken()];

    super({
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
      jwtFromRequest: ExtractJwt.fromExtractors(extractors),
      ignoreExpiration: true,
    } as StrategyOptions);
  }

  async validate(payload) {
    return this.userService.findOneBy({ _id: payload.sub });
  }
}

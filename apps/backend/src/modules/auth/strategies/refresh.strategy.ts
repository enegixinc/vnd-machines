import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

import { AuthService } from '../auth.service';
import { ConfigService } from '@backend/config';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {
    const extractors = [
      ExtractJwt.fromUrlQueryParameter('refresh_token'),
      ExtractJwt.fromBodyField('refresh_token'),
    ];

    super({
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
      jwtFromRequest: ExtractJwt.fromExtractors(extractors),
      passReqToCallback: true,
      ignoreExpiration: false,
    } as StrategyOptions);
  }

  async validate(request: Request, payload: { sub: string }) {
    const storedRefreshToken = await this.authService.validateRefreshToken(
      payload.sub,
      request.body.refresh_token
    );

    if (!storedRefreshToken) {
      throw new Error('Invalid refresh token');
    }

    return { userId: payload.sub };
  }
}

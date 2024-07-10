import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dto/login.dto';
import { User } from './decorators/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../users/entities/user.entity';
import { SerializedUserDto } from '../users/dto/response/serialized-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiBody({
    type: LoginDto,
  })
  @UseGuards(AuthGuard('local'))
  async login(@User() user: UserEntity) {
    if (!user.active) throw new UnauthorizedException('User is not active');
    return this.authService.login(user);
  }

  @Get('me')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    type: SerializedUserDto,
  })
  @HttpCode(HttpStatus.OK)
  async me(@User() { _id }: UserEntity) {
    const user = await this.authService.me(_id);
    return new SerializedUserDto(user);
  }

  @ApiOperation({
    summary: 'Refresh access token',
    operationId: 'refreshToken',
  })
  @ApiResponse({
    status: 200,
    description: 'Refresh token',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            accessToken: { type: 'string' },
            refreshToken: { type: 'string' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Invalid refresh token',
  })
  @ApiBody({
    type: Object,
    required: true,
    examples: {
      Object: {
        value: {
          refresh_token: 'string',
        },
      },
    },
  })
  @Post('refresh')
  @Public()
  @UseGuards(AuthGuard('refresh'))
  async refresh(@User() { _id }: UserEntity) {
    const user = await this.authService.me(_id);
    if (!user.active) throw new UnauthorizedException('User is not active');

    return this.authService.login(user);
  }
  //
  // @Get('logout')
  // @ApiBearerAuth('access-token')
  // @UseGuards(AuthGuard('jwt'))
  // @HttpCode(HttpStatus.NO_CONTENT)
  // async logout(@User() { _id }: UserEntity) {
  //   return this.authService.logout(_id);
  // }
}

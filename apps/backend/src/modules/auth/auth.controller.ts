import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { Public } from './decorators/public.decorator';
import { LoginDto } from './dto/login.dto';
import { User } from './decorators/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../users/entities/user.entity';
import { SerializedUserDto } from '../users/dto/response/serialized-user.dto';

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
  //
  // @ApiBearerAuth()
  // @SerializeOptions({
  //   groups: ['me'],
  // })
  // @Post('refresh')
  // @UseGuards(AuthGuard('jwt-refresh'))
  // @HttpCode(HttpStatus.OK)
  // public refresh(@Request() request): Promise<RefreshResponseDto> {
  //   return this.authService.refreshToken({
  //     sessionId: request.user.sessionId,
  //     hash: request.user.hash,
  //   });
  // }
}

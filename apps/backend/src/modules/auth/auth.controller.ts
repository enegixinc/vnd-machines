import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';
import { LoginDto } from './dto/login.dto';
import { Request as Req } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body(ValidationPipe) loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto);
    const tokens = await this.authService.login(user);
    return {
      message: "You've logged in successfully",
      statusCode: HttpStatus.OK,
      tokens,
    };
  }

  @UseGuards(JwtGuard)
  @Get('/protected')
  protected(@Request() req: Req) {
    return {
      message: "You've accessed a protected data successfully",
      statusCode: HttpStatus.OK,
      user: req.user,
    };
  }
}

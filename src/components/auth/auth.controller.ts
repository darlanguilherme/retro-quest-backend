import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { HttpExceptionFilter } from 'src/filters/http.exception.filter';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseFilters(new HttpExceptionFilter())
  async login(@Body() body: { username: string; password: string }) {
    return this.authService.login(body);
  }
}

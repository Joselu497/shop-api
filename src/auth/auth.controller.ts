import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('login')
  async login(
    @Body() credentials: { name: string; password: string },
  ): Promise<string> {
    return await this.AuthService.login(credentials.name, credentials.password);
  }
}

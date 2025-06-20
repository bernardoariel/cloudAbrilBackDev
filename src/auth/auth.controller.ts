import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  // Endpoint para iniciar sesión
  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.loginUser(email, password);
  }
    
  @Post('logout')
  async logout() {
    return this.authService.logoutUser();
  }

  @Post('refresh')
  async refresh(@Body() refreshDto: { refreshToken: string }) {
    return this.authService.refreshToken(refreshDto.refreshToken);
  }
}

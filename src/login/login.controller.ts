import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './login.dto';


@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }
  // Endpoint para iniciar sesión
  @Post()
  async login(@Body() loginDto: LoginDto) {
    return this.loginService.login(loginDto)
  }

}

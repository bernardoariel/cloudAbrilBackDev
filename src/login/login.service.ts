import { Injectable, UnauthorizedException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { LoginCliente } from './entities/login.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './login.dto';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(LoginCliente, 'sqlserverConnection')
    private readonly loginRepository: Repository<LoginCliente>,
    private readonly jwtService: JwtService
  ) { }

  async login(loginDto: LoginDto) {
    const { codCliente, nroDoc } = loginDto;

    const cliente = await this.loginRepository.findOne({
      where: {
        codCliente,
        nroDoc
      }
    })

    if (!cliente) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: cliente.codCliente,
      nroDoc: cliente.nroDoc
    }

    return {
      cliente,
      access_token: this.jwtService.sign(payload)
    }
  }

}

import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginCliente } from './entities/login.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([LoginCliente], 'sqlserverConnection'),
    PassportModule,
    JwtModule.register({
      secret: 'clientes123',
      signOptions: { expiresIn: '60s' },
    })
  ],
  controllers: [LoginController],
  providers: [LoginService],
  exports: [TypeOrmModule, JwtModule]
})
export class LoginModule { }

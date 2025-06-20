import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from './entities/usuarios.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuarios], 'sqlserverConnection'),
    PassportModule,
    JwtModule.register({
      secret: 'yourSecretKey',  // Define una clave secreta para firmar los tokens
      signOptions: { expiresIn: '10s' },  // Duración del token
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports:[TypeOrmModule,JwtModule]
})
export class AuthModule {}

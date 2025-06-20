import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new HttpException({
        message: "No se ha proporcionado un token de autenticación",
        statusCode: HttpStatus.UNAUTHORIZED,
      }, HttpStatus.UNAUTHORIZED);
    }

    try {
      const decoded = this.jwtService.verify(token);
      request.user = decoded;
      return true;
    } catch (error) {
      throw new HttpException({
        message: "Token inválido o caducado",
        statusCode: HttpStatus.FORBIDDEN,
        error: "Forbidden",
      }, HttpStatus.FORBIDDEN);
    }
  }
}

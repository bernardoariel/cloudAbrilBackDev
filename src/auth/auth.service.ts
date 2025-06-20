import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from 'firebase-config';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuarios } from './entities/usuarios.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuarios, 'sqlserverConnection')
    private readonly usuariosRepository: Repository<Usuarios>,
    private readonly jwtService: JwtService 
  ) {}
    
  async loginUser(email: string, password: string): Promise<any> {
    try {
      // Paso 1: Validar en SQL Server
      const usuario = await this.usuariosRepository.findOne({
        where: { email },
      });
  
      if (!usuario || usuario.PassEmail !== password) {
        throw new HttpException(
          'El usuario o la contraseña son incorrectos.',
          HttpStatus.UNAUTHORIZED
        );
      }
  
      // Verificar que el estado sea 'A'
      if (usuario.Estado !== 'A') {
        throw new HttpException(
          'El usuario no está activo en el sistema.',
          HttpStatus.FORBIDDEN
        );
      }
  
      // Paso 2: Verificar en Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
  
      const payload = { email: usuario.email, sub: usuario.codUser }; 
  
      // Generar el access token (expira en 30 segundos)
      const accessToken = this.jwtService.sign(payload, { expiresIn: '10m' });
      // Generar el refresh token (expira en 7 días)
      const refreshToken = this.jwtService.sign(payload, { expiresIn: '2h' });
  
      // Devolver ambos tokens
      return {
        message: "Login exitoso.",
        user: firebaseUser,
        accessToken, // Access token para las solicitudes protegidas
        refreshToken // Refresh token para renovar el access token
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
  
      console.error("Error durante el login:", error);
      throw new HttpException(
        'Error interno del servidor. Por favor, intenta nuevamente más tarde.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
    

  async logoutUser(): Promise<void> {
    try {
      await signOut(auth);
      console.log("Sesión cerrada correctamente.");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      throw new Error('Error al cerrar sesión');
    }
  } 
  
  // Método para refrescar el token de acceso
  async refreshToken(refreshToken: string): Promise<any> {
    try {
      // Verificar que el refresh token es válido
      const payload = this.jwtService.verify(refreshToken);

      // Verificar si el usuario existe en la base de datos
      const usuario = await this.usuariosRepository.findOne({
        where: { codUser: payload.sub },
      });

      if (!usuario) {
        throw new HttpException('Usuario no encontrado', HttpStatus.FORBIDDEN);
      }

      // Generar un nuevo access token (expira en 30 segundos)
      const newAccessToken = this.jwtService.sign(
        { email: usuario.email, sub: usuario.codUser }, 
        { expiresIn: '10m' }
      );

      return {
        accessToken: newAccessToken,  // Devuelve el nuevo access token
      };
    } catch (error) {
      console.error("Error al renovar el token:", error);
      throw new HttpException('Refresh token no válido o expirado', HttpStatus.UNAUTHORIZED);
    }
  }
}

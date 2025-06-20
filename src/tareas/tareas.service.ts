import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { firebaseAdmin } from '../../firebase-admin.config';
import { Usuarios } from 'src/auth/entities/usuarios.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TareasService {
  private readonly logger = new Logger(TareasService.name);

  constructor(
    @InjectRepository(Usuarios, 'sqlserverConnection')
    private readonly usuariosRepository: Repository<Usuarios>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async sincronizarUsuarios(): Promise<void> {
    this.logger.log('Iniciando sincronización de usuarios con Firebase...');
    await this.sincronizarUsuariosConFirebase();
  }

  async ejecutarTareaManual(): Promise<string> {
    await this.sincronizarUsuariosConFirebase();
    return 'Tarea ejecutada manualmente con éxito.';
  }

  private async sincronizarUsuariosConFirebase() {
    try {
      const usuarios = await this.usuariosRepository.find({
        where: { Estado: 'A' },
      });

      for (const usuario of usuarios) {
        const email = usuario.email.trim();
        const password = usuario.PassEmail;

        if (!email || !password || email === 'unEmail@hotmail.com' || password === 'unPassword') {
          this.logger.warn(`Usuario con email ${email} omitido por datos inválidos.`);
          continue;
        }

        try {
          await firebaseAdmin.auth().getUserByEmail(email);
          this.logger.log(`Usuario ${email} ya existe en Firebase.`);
        } catch (error) {
          if (error.code === 'auth/user-not-found') {
            try {
              await firebaseAdmin.auth().createUser({
                email,
                password,
              });
              this.logger.log(`Usuario ${email} creado en Firebase.`);
            } catch (creationError) {
              this.logger.error(`Error al crear el usuario ${email}:`, creationError);
            }
          } else {
            this.logger.error(`Error al verificar el usuario ${email}:`, error);
          }
        }
      }
    } catch (error) {
      this.logger.error('Error al sincronizar usuarios con Firebase:', error);
    }
  }
  async renovarPasswordDesdeCRM(email: string): Promise<string> {
    if (!email) {
      throw new Error('El email es obligatorio.');
    }

    try {
      // Buscar usuario en Firebase
      const usuarioFirebase = await firebaseAdmin.auth().getUserByEmail(email);
      
      if (!usuarioFirebase) {
        this.logger.warn(`Usuario con email ${email} no encontrado en Firebase.`);
        return `Usuario con email ${email} no existe en Firebase.`;
      }

      // Buscar la contraseña en el CRM
      const usuarioCRM = await this.usuariosRepository.findOne({ where: { email } });

      if (!usuarioCRM || !usuarioCRM.PassEmail) {
        this.logger.warn(`No se encontró la contraseña en el CRM para el usuario ${email}.`);
        return `No se encontró la contraseña en el CRM para el usuario ${email}.`;
      }

      // Actualizar la contraseña en Firebase
      await firebaseAdmin.auth().updateUser(usuarioFirebase.uid, {
        password: usuarioCRM.PassEmail,
      });

      this.logger.log(`Contraseña actualizada en Firebase para ${email}.`);
      return `Contraseña actualizada en Firebase para ${email}.`;
    } catch (error) {
      this.logger.error(`Error al renovar la contraseña en Firebase para ${email}:`, error);
      throw new Error(`Error al renovar la contraseña: ${error.message}`);
    }
  }
}
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TareasService } from './tareas.service';
import { TareasController } from './tareas.controller';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [ScheduleModule.forRoot(),UsuariosModule,AuthModule],
  controllers: [TareasController],
  providers: [TareasService],
  exports: [TareasService],
})
export class TareasModule {}

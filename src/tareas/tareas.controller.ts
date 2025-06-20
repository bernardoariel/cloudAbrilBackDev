// src/tareas/tareas.controller.ts

import { Body, Controller, Post } from '@nestjs/common';
import { TareasService } from './tareas.service';

@Controller('tareas')
export class TareasController {
  constructor(private readonly tareasService: TareasService) {}

  @Post('ejecutar')
  async ejecutarTareaManual() {
    return this.tareasService.ejecutarTareaManual();
  }
  @Post('renovar-password')
  async renovarPassword(@Body('email') email: string) {
    try {
      return await this.tareasService.renovarPasswordDesdeCRM(email);
    } catch (error) {
       console.log(`Error al renovar contraseña para ${email}:`, error);
      throw error;
    }
  }
}

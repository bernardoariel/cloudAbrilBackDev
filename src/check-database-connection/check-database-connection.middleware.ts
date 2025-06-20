import { HttpException, HttpStatus, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class CheckDatabaseConnectionMiddleware implements NestMiddleware {
  private readonly logger = new Logger(CheckDatabaseConnectionMiddleware.name);

  constructor(@InjectDataSource('sqlserverConnection') private dataSource: DataSource) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      await this.dataSource.query('SELECT 1'); // Consulta simple para verificar la conexión
      next();
    } catch (error) {
      this.logger.error('Database connection failed', error);
      throw new HttpException('Service Unavailable', HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
}

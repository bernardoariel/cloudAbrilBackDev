import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteRecProvDet } from './entities/cliente-recprov-det.entity';

@Injectable()
export class ClientesRecProvDetService {
    private readonly logger = new Logger(ClientesRecProvDetService.name);

    constructor(
        @InjectRepository(ClienteRecProvDet, 'sqlserverConnection')
        private readonly clienteRecProvDetRepository: Repository<ClienteRecProvDet>,
    ) { }

    async findAll(): Promise<ClienteRecProvDet[]> {
        try {
            return this.clienteRecProvDetRepository.find();
        } catch (error) {
            this.logger.error('Error en findAll:', error);
            throw error;
        }
    }

    async findByReciboPr(codReciboPr: string): Promise<ClienteRecProvDet[]> {
        try {
            return this.clienteRecProvDetRepository.find({
                where: { codReciboPr },
                order: { nroCuota: 'ASC' },
            });
        } catch (error) {
            this.logger.error(`Error en findByReciboPr: ${error.message}`, error.stack);
            throw error;
        }
    }

    async findOne(codReciboPr: string, nroCuota: number): Promise<ClienteRecProvDet> {
        try {
            return this.clienteRecProvDetRepository.findOne({
                where: { codReciboPr, nroCuota },
            });
        } catch (error) {
            this.logger.error(`Error en findOne: ${error.message}`, error.stack);
            throw error;
        }
    }
}
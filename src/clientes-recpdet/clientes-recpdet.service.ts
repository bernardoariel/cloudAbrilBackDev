import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteRecpdet } from './entities/cliente-recpdet.entity';
import { CreateClienteRecpdetDto } from './dto/create-cliente-recpdet.dto';
import { UpdateClienteRecpdetDto } from './dto/update-cliente-recpdet.dto';

@Injectable()
export class ClientesRecpdetService {
    constructor(
        @InjectRepository(ClienteRecpdet, 'sqlserverConnection')
        private clienteRecpdetRepository: Repository<ClienteRecpdet>,
    ) { }

    async create(createClienteRecpdetDto: CreateClienteRecpdetDto): Promise<ClienteRecpdet> {
        const nuevoRecpdet = this.clienteRecpdetRepository.create(createClienteRecpdetDto);
        return await this.clienteRecpdetRepository.save(nuevoRecpdet);
    }

    async findAll(): Promise<ClienteRecpdet[]> {
        return await this.clienteRecpdetRepository.find();
    }

    async findOne(id: number): Promise<ClienteRecpdet> {
        const recpdet = await this.clienteRecpdetRepository.findOne({ where: { ID: id } });

        if (!recpdet) {
            throw new NotFoundException(`Detalle de recibo con ID ${id} no encontrado`);
        }

        return recpdet;
    }

    async findByReciboOf(codReciboOf: string): Promise<ClienteRecpdet[]> {
        return await this.clienteRecpdetRepository.find({
            where: { codReciboOf }
        });
    }

    async findByCredito(codCredito: string): Promise<ClienteRecpdet[]> {
        return await this.clienteRecpdetRepository.find({
            where: { codCredito }
        });
    }

    async update(id: number, updateClienteRecpdetDto: UpdateClienteRecpdetDto): Promise<ClienteRecpdet> {
        const recpdet = await this.findOne(id);

        // Aplicar los cambios al objeto
        Object.assign(recpdet, updateClienteRecpdetDto);

        return await this.clienteRecpdetRepository.save(recpdet);
    }

    async remove(id: number): Promise<void> {
        const result = await this.clienteRecpdetRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Detalle de recibo con ID ${id} no encontrado`);
        }
    }
}

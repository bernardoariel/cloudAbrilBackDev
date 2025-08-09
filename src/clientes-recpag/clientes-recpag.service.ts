import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteRecPag } from './entities/cliente-recpag.entity';

@Injectable()
export class ClientesRecPagService {
    constructor(
        @InjectRepository(ClienteRecPag, 'sqlserverConnection')
        private readonly clientesRecPagRepository: Repository<ClienteRecPag>,
    ) { }

    findAll() {
        return this.clientesRecPagRepository.find({
            take: 20,  // Limitar a 20 registros para no sobrecargar la respuesta
            order: {
                fecha: 'DESC'  // Ordenar por fecha descendente para ver los pagos más recientes
            }
        });
    }

    findOne(id: number) {
        return this.clientesRecPagRepository.findOne({ where: { codSucRecibo: id } });
    }

    findByCredito(codCredito: string) {
        return this.clientesRecPagRepository.find({ where: { codCredito } });
    }

    async findDistinctCreditos() {
        // Obtener códigos de crédito únicos
        const result = await this.clientesRecPagRepository
            .createQueryBuilder('recPag')
            .select('DISTINCT recPag.codCredito')
            .where('recPag.codCredito IS NOT NULL')
            .limit(50)
            .getRawMany();

        return result.map(item => item.codCredito);
    }
}

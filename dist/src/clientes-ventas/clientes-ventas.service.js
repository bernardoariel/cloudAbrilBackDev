"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientesVentasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cliente_venta_entity_1 = require("./entities/cliente-venta.entity");
let ClientesVentasService = class ClientesVentasService {
    constructor(ClientesVentasRepository) {
        this.ClientesVentasRepository = ClientesVentasRepository;
    }
    async findAll() {
        return this.ClientesVentasRepository.find();
    }
    findOne(id) {
        return `This action returns a #${id} venta`;
    }
    async findByFecha(desde, hasta) {
        return this.ClientesVentasRepository.find({
            where: {
                Fecha: (0, typeorm_2.Between)(desde, hasta),
            },
            order: {
                Fecha: 'ASC',
            },
        });
    }
    async findByFechaConCliente(desde, hasta) {
        return this.ClientesVentasRepository
            .createQueryBuilder('venta')
            .innerJoin('Clientes_Per', 'cliente', 'venta.CodCliente = cliente.CodCliente')
            .where('venta.Fecha BETWEEN :desde AND :hasta', { desde, hasta })
            .select([
            'venta.CodVenta',
            'venta.Fecha',
            'venta.Total',
            'venta.FormaPago',
            'venta.Estado',
            'cliente.Nombre',
            'cliente.CodSucursal',
            'cliente.NroDoc',
            'cliente.Telefonos',
        ])
            .orderBy('venta.Fecha', 'ASC')
            .getRawMany();
    }
    async findVentaCompleta(codVenta) {
        const venta = await this.ClientesVentasRepository.findOne({
            where: { CodVenta: codVenta },
            relations: ['cliente', 'detalles', 'detalles.producto'],
        });
        if (!venta)
            return null;
        return {
            CodVenta: venta.CodVenta,
            Fecha: venta.Fecha,
            Total: venta.Total,
            FormaPago: venta.FormaPago?.trim(),
            Estado: venta.Estado,
            cliente: {
                codCliente: venta.cliente?.codCliente,
                nombre: venta.cliente?.nombre,
                nroDoc: venta.cliente?.nroDoc,
                telefonos: venta.cliente?.telefonos,
            },
            detalles: venta.detalles.map(d => ({
                CodProducto: d.CodProducto,
                NombreProducto: d.producto?.Producto,
                Cantidad: d.Cantidad,
                PrecioUnit: d.PrecioUnit,
                Subtotal: Number(d.Cantidad) * Number(d.PrecioUnit),
            })),
        };
    }
};
exports.ClientesVentasService = ClientesVentasService;
exports.ClientesVentasService = ClientesVentasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cliente_venta_entity_1.ClienteVenta, 'sqlserverConnection')),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ClientesVentasService);
//# sourceMappingURL=clientes-ventas.service.js.map
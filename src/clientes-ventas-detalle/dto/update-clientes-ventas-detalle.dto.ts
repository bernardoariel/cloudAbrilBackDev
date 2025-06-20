import { PartialType } from '@nestjs/swagger';
import { CreateClientesVentasDetalleDto } from './create-clientes-ventas-detalle.dto';

export class UpdateClientesVentasDetalleDto extends PartialType(CreateClientesVentasDetalleDto) {}

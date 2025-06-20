import { PartialType } from '@nestjs/swagger';
import { CreateFormaPagoPlaneDto } from './create-forma-pago-plane.dto';

export class UpdateFormaPagoPlaneDto extends PartialType(CreateFormaPagoPlaneDto) {}

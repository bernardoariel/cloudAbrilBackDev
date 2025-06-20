import { Controller } from '@nestjs/common';
import { ProdImageService } from './prod-image.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Abril-SqlServer')
@Controller('prod-image')
export class ProdImageController {
  constructor(private readonly prodImageService: ProdImageService) {}

  
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdStock } from './entities/prod-stock.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProdStockService {
  private stockCache: { CodProducto: string; totalCantidad: number }[]=[]
  constructor(
    @InjectRepository(ProdStock,'sqlserverConnection')
    private prodStockRepository: Repository<ProdStock>,
  ) {}
  async loadStockCache(): Promise<void> {
    this.stockCache = await this.prodStockRepository
      .createQueryBuilder('prodStock')
      .select('prodStock.CodProducto', 'CodProducto')
      .addSelect('SUM(prodStock.Cantidad)', 'totalCantidad')
      .where('prodStock.Cantidad != :cantidad', { cantidad: 0 })
      .groupBy('prodStock.CodProducto')
      .getRawMany();
  }

  getStockFromCache(codProducto: string): { CodProducto: string; totalCantidad: number } | undefined {
    return this.stockCache.find((item) => item.CodProducto === codProducto);
  }
  getAllStockFromCache(): { CodProducto: string; totalCantidad: number }[] {
    return this.stockCache;
  }


  async findByCodProductoWithStock(codProducto: string): Promise<ProdStock[]> {
    const results = await this.prodStockRepository
    .createQueryBuilder('prodStock')
    .where('prodStock.CodProducto = :codProducto', { codProducto })
    .andWhere('prodStock.Cantidad > 0')
    .getMany();
  
  
    return results;
  }
 
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { ProdCostosService } from 'src/prod-costos/prod-costos.service';
import { ProdImageService } from 'src/prod-image/prod-image.service';
import { ProdStockService } from 'src/prod-stock/prod-stock.service';
import { ProdMarcaService } from 'src/prod-marca/prod-marca.service';

@Injectable()
export class ProductosService {
  
  constructor(
    @InjectRepository(Producto,'sqlserverConnection')
    private productosRepository: Repository<Producto>,
    private readonly prodCostosService: ProdCostosService,
    private readonly prodImageService: ProdImageService,
    private readonly prodStockService: ProdStockService,
    private readonly prodMarcaService: ProdMarcaService 
  ) {}
  async onModuleInit() {
    await this.prodStockService.loadStockCache();
  }
  async findAllProducts(): Promise<Producto[]> {
    const allProducts = await this.productosRepository.find();
    const stockCache = this.prodStockService.getAllStockFromCache();
    return allProducts.filter((product) => {
        const stock = stockCache.find((item) => item.CodProducto === product.CodProducto);
        return stock && stock.totalCantidad > 0;
      });
  }
  async findProductWithPrice(term: string): Promise<any> {
    let producto: Producto | Producto[];

    if (!isNaN(+term)) {
        producto = await this.productosRepository.findOne({ where: { CodProducto: term } });
    } else {
        producto = await this.productosRepository
            .createQueryBuilder('producto')
            .where('producto.Producto LIKE :Producto', { Producto: `%${term.trim()}%` })
            .getMany();

         // Si no se encuentra ningún producto, buscar por marca
    if (producto.length === 0) {
        // Convertir el término a número para buscar por CodMarca
        const marcaId = parseInt(term, 10);

        // Buscar la marca si el término es numérico
        const marca = await this.prodMarcaService.findOne(marcaId);

        if (!marca) {
            throw new NotFoundException('Marca no encontrada');
        }

        // Buscar productos asociados a la marca encontrada
        producto = await this.productosRepository.find({ where: { CodMarca: marca.CodMarca } });

        if (!producto || producto.length === 0) {
            throw new NotFoundException('No se encontraron productos para la marca proporcionada');
        }
    }
    }

    if (!producto || (Array.isArray(producto) && producto.length === 0)) {
        throw new NotFoundException('Producto no encontrado');
    }

    // Manejo de producto cuando es un array (más de un producto encontrado)
    if (Array.isArray(producto)) {
        const productosConStock = [];

        for (const prod of producto) {
            const prodStock = await this.prodStockService.findByCodProductoWithStock(prod.CodProducto);
            const totalStock = prodStock.reduce((total, stock) => total + stock.Cantidad, 0);

            if (totalStock > 0) {
                const prodCostos = await this.prodCostosService.findByCodProducto(prod.CodProducto);
                const prodImagen = await this.prodImageService.findByCodProducto(prod.CodProducto);

                if (!prodCostos) {
                    throw new NotFoundException(`Costos no encontrados para el producto con CodProducto: ${prod.CodProducto}`);
                }

                productosConStock.push({
                    ...prod,
                    Precio: prodCostos.Precio,
                    // Imagen: prodImagen?.URL.replace('10.10.0.12', 'abcentro.quaga.net') || null,
                    Imagen: prodImagen?.URL.replace('10.10.0.12', 'abril.arielbernardo.com/public_image') || null,
                    Stock: totalStock,
                    Sucursales: prodStock.map(stock => ({
                        CodSucursal: stock.CodSucursal,
                        Cantidad: stock.Cantidad,
                    })),
                });
            }
        }

        if (productosConStock.length === 0) {
            throw new NotFoundException('Ningún producto con stock disponible fue encontrado');
        }
        productosConStock.sort((a, b) => b.Stock - a.Stock);
        return productosConStock;
    } else {
        // Manejo de producto único
        const prodStock = await this.prodStockService.findByCodProductoWithStock(producto.CodProducto);
        const totalStock = prodStock.reduce((total, stock) => total + stock.Cantidad, 0);

        /* if (totalStock === 0) {
            throw new NotFoundException('El producto no tiene stock disponible');
        } */

        const prodCostos = await this.prodCostosService.findByCodProducto(producto.CodProducto);
        const prodImagen = await this.prodImageService.findByCodProducto(producto.CodProducto);

        if (!prodCostos) {
            throw new NotFoundException('Costos para el producto no encontrados');
        }

        return {
            ...producto,
            Precio: prodCostos.Precio,
            // Imagen: prodImagen?.URL.replace('10.10.0.12', 'abcentro.quaga.net') || null,
            Imagen: prodImagen?.URL.replace('10.10.0.12', 'abril.arielbernardo.com/public_image') || null,
            Stock: totalStock,
            Sucursales: prodStock.map(stock => ({
                CodSucursal: stock.CodSucursal,
                Cantidad: stock.Cantidad,
            })),
        };
    }
  }
  
  async findProductsByMarca(term: string): Promise<any> {
    // Buscar la marca por nombre
    const marca = await this.prodMarcaService.findByNombre(term);

    if (!marca) {
      throw new NotFoundException('Marca no encontrada');
    }

    // Buscar productos asociados a la marca encontrada
    const productos = await this.productosRepository.find({ where: { CodMarca: marca.CodMarca } });

    if (!productos || productos.length === 0) {
      throw new NotFoundException('No se encontraron productos para la marca proporcionada');
    }

    // Procesar cada producto para devolver en el formato deseado
    const productosConStock = [];

    for (const prod of productos) {
        // Obtener el stock del producto
        const prodStock = await this.prodStockService.findByCodProductoWithStock(prod.CodProducto);
        const totalStock = prodStock.reduce((total, stock) => total + stock.Cantidad, 0);

        if (totalStock > 0) {
            // Obtener el costo y la imagen del producto
            const prodCostos = await this.prodCostosService.findByCodProducto(prod.CodProducto);
            const prodImagen = await this.prodImageService.findByCodProducto(prod.CodProducto);

            if (!prodCostos) {
                throw new NotFoundException(`Costos no encontrados para el producto con CodProducto: ${prod.CodProducto}`);
            }

            // Agregar el producto con toda la información detallada
            productosConStock.push({
                ...prod,
                Precio: prodCostos.Precio,
                // Imagen: prodImagen?.URL.replace('10.10.0.12', 'abcentro.quaga.net') || null,
                Imagen: prodImagen?.URL.replace('10.10.0.12', 'abril.arielbernardo.com/public_image') || null,
                Stock: totalStock,
                Sucursales: prodStock.map(stock => ({
                    CodSucursal: stock.CodSucursal,
                    Cantidad: stock.Cantidad,
                })),
            });
        }
    }

    if (productosConStock.length === 0) {
      throw new NotFoundException('Ningún producto con stock disponible fue encontrado');
    }

    // Devolver productos con stock
    return productosConStock;
}

  
  
}



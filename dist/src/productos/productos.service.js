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
exports.ProductosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const producto_entity_1 = require("./entities/producto.entity");
const typeorm_2 = require("typeorm");
const prod_costos_service_1 = require("../prod-costos/prod-costos.service");
const prod_image_service_1 = require("../prod-image/prod-image.service");
const prod_stock_service_1 = require("../prod-stock/prod-stock.service");
const prod_marca_service_1 = require("../prod-marca/prod-marca.service");
let ProductosService = class ProductosService {
    constructor(productosRepository, prodCostosService, prodImageService, prodStockService, prodMarcaService) {
        this.productosRepository = productosRepository;
        this.prodCostosService = prodCostosService;
        this.prodImageService = prodImageService;
        this.prodStockService = prodStockService;
        this.prodMarcaService = prodMarcaService;
    }
    async onModuleInit() {
        await this.prodStockService.loadStockCache();
    }
    async findAllProducts() {
        const allProducts = await this.productosRepository.find();
        const stockCache = this.prodStockService.getAllStockFromCache();
        return allProducts.filter((product) => {
            const stock = stockCache.find((item) => item.CodProducto === product.CodProducto);
            return stock && stock.totalCantidad > 0;
        });
    }
    async findProductWithPrice(term) {
        let producto;
        if (!isNaN(+term)) {
            producto = await this.productosRepository.findOne({ where: { CodProducto: term } });
        }
        else {
            producto = await this.productosRepository
                .createQueryBuilder('producto')
                .where('producto.Producto LIKE :Producto', { Producto: `%${term.trim()}%` })
                .getMany();
            if (producto.length === 0) {
                const marcaId = parseInt(term, 10);
                const marca = await this.prodMarcaService.findOne(marcaId);
                if (!marca) {
                    throw new common_1.NotFoundException('Marca no encontrada');
                }
                producto = await this.productosRepository.find({ where: { CodMarca: marca.CodMarca } });
                if (!producto || producto.length === 0) {
                    throw new common_1.NotFoundException('No se encontraron productos para la marca proporcionada');
                }
            }
        }
        if (!producto || (Array.isArray(producto) && producto.length === 0)) {
            throw new common_1.NotFoundException('Producto no encontrado');
        }
        if (Array.isArray(producto)) {
            const productosConStock = [];
            for (const prod of producto) {
                const prodStock = await this.prodStockService.findByCodProductoWithStock(prod.CodProducto);
                const totalStock = prodStock.reduce((total, stock) => total + stock.Cantidad, 0);
                if (totalStock > 0) {
                    const prodCostos = await this.prodCostosService.findByCodProducto(prod.CodProducto);
                    const prodImagen = await this.prodImageService.findByCodProducto(prod.CodProducto);
                    if (!prodCostos) {
                        throw new common_1.NotFoundException(`Costos no encontrados para el producto con CodProducto: ${prod.CodProducto}`);
                    }
                    productosConStock.push({
                        ...prod,
                        Precio: prodCostos.Precio,
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
                throw new common_1.NotFoundException('Ningún producto con stock disponible fue encontrado');
            }
            productosConStock.sort((a, b) => b.Stock - a.Stock);
            return productosConStock;
        }
        else {
            const prodStock = await this.prodStockService.findByCodProductoWithStock(producto.CodProducto);
            const totalStock = prodStock.reduce((total, stock) => total + stock.Cantidad, 0);
            const prodCostos = await this.prodCostosService.findByCodProducto(producto.CodProducto);
            const prodImagen = await this.prodImageService.findByCodProducto(producto.CodProducto);
            if (!prodCostos) {
                throw new common_1.NotFoundException('Costos para el producto no encontrados');
            }
            return {
                ...producto,
                Precio: prodCostos.Precio,
                Imagen: prodImagen?.URL.replace('10.10.0.12', 'abril.arielbernardo.com/public_image') || null,
                Stock: totalStock,
                Sucursales: prodStock.map(stock => ({
                    CodSucursal: stock.CodSucursal,
                    Cantidad: stock.Cantidad,
                })),
            };
        }
    }
    async findProductsByMarca(term) {
        const marca = await this.prodMarcaService.findByNombre(term);
        if (!marca) {
            throw new common_1.NotFoundException('Marca no encontrada');
        }
        const productos = await this.productosRepository.find({ where: { CodMarca: marca.CodMarca } });
        if (!productos || productos.length === 0) {
            throw new common_1.NotFoundException('No se encontraron productos para la marca proporcionada');
        }
        const productosConStock = [];
        for (const prod of productos) {
            const prodStock = await this.prodStockService.findByCodProductoWithStock(prod.CodProducto);
            const totalStock = prodStock.reduce((total, stock) => total + stock.Cantidad, 0);
            if (totalStock > 0) {
                const prodCostos = await this.prodCostosService.findByCodProducto(prod.CodProducto);
                const prodImagen = await this.prodImageService.findByCodProducto(prod.CodProducto);
                if (!prodCostos) {
                    throw new common_1.NotFoundException(`Costos no encontrados para el producto con CodProducto: ${prod.CodProducto}`);
                }
                productosConStock.push({
                    ...prod,
                    Precio: prodCostos.Precio,
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
            throw new common_1.NotFoundException('Ningún producto con stock disponible fue encontrado');
        }
        return productosConStock;
    }
};
exports.ProductosService = ProductosService;
exports.ProductosService = ProductosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(producto_entity_1.Producto, 'sqlserverConnection')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        prod_costos_service_1.ProdCostosService,
        prod_image_service_1.ProdImageService,
        prod_stock_service_1.ProdStockService,
        prod_marca_service_1.ProdMarcaService])
], ProductosService);
//# sourceMappingURL=productos.service.js.map
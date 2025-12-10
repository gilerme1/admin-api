import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Sales')
@Controller('sales')
export class SalesController {
    constructor(private readonly salesService: SalesService) {}

    @Post('generate')
    @ApiOperation({ summary: 'Generar una venta' })
    @ApiBody({ type: CreateSaleDto })
    @ApiResponse({ status: 201, description: 'Venta creada exitosamente.' })
    create(@Body() dto: CreateSaleDto) {
        return this.salesService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todas las ventas' })
    @ApiResponse({ status: 200, description: 'Lista de ventas retornada.' })
    findAll() {
        return this.salesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener una venta por ID' })
    @ApiParam({ name: 'id', description: 'ID de la venta' })
    @ApiResponse({ status: 200, description: 'Venta encontrada.' })
    findOne(@Param('id') id: string) {
        return this.salesService.findOne(id);
    }
}

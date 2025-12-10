/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderStatusDto, UpdateOrderPaymentDto } from './dto/order.dto';
import { EstadoOrden, EstadoPago } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @Post()
    @ApiOperation({ summary: 'Crear una orden' })
    @ApiResponse({ status: 201, description: 'Orden creada exitosamente' })
    create(@Request() req, @Body() dto: CreateOrderDto) {
        return this.ordersService.create(req.user.id, dto);
    }

    @Get('my-orders')
    @ApiOperation({ summary: 'Listar órdenes del usuario autenticado' })
    findMyOrders(@Request() req) {
        return this.ordersService.findAllByUser(req.user.id);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todas las órdenes' })
    @ApiQuery({ name: 'estado', required: false, enum: EstadoOrden })
    @ApiQuery({ name: 'pago', required: false, enum: EstadoPago })
    findAll(
        @Query('estado') estado?: EstadoOrden,
        @Query('pago') pago?: EstadoPago,
    ) {
        return this.ordersService.findAll({ estado, pago });
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener una orden por ID' })
    @ApiParam({ name: 'id', example: 'uuid' })
    findOne(@Param('id') id: string, @Request() req) {
        return this.ordersService.findOne(id, req.user.id);
    }

    @Patch(':id/status')
    @ApiOperation({ summary: 'Actualizar estado de una orden' })
    updateStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusDto) {
        return this.ordersService.updateStatus(id, dto);
    }

    @Patch(':id/payment')
    @ApiOperation({ summary: 'Actualizar estado de pago de una orden' })
    updatePayment(@Param('id') id: string, @Body() dto: UpdateOrderPaymentDto) {
        return this.ordersService.updatePayment(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Cancelar una orden' })
    cancel(@Param('id') id: string, @Request() req) {
        return this.ordersService.cancel(id, req.user.id);
    }
}

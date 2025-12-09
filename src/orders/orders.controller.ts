/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderStatusDto, UpdateOrderPaymentDto } from './dto/order.dto';
import { EstadoOrden, EstadoPago } from '@prisma/client';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @Post()
    create(@Request() req, @Body() dto: CreateOrderDto) {
        return this.ordersService.create(req.user.id, dto);
    }

    @Get('my-orders')
    findMyOrders(@Request() req) {
        return this.ordersService.findAllByUser(req.user.id);
    }

    @Get()
    findAll(
        @Query('estado') estado?: EstadoOrden,
        @Query('pago') pago?: EstadoPago,
    ) {
        return this.ordersService.findAll({ estado, pago });
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Request() req) {
        return this.ordersService.findOne(id, req.user.id);
    }

    @Patch(':id/status')
    updateStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusDto) {
        return this.ordersService.updateStatus(id, dto);
    }

    @Patch(':id/payment')
    updatePayment(@Param('id') id: string, @Body() dto: UpdateOrderPaymentDto) {
        return this.ordersService.updatePayment(id, dto);
    }

    @Delete(':id')
    cancel(@Param('id') id: string, @Request() req) {
        return this.ordersService.cancel(id, req.user.id);
    }
}
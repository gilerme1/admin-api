/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { IsNotEmpty, IsArray, ValidateNested, IsUUID, IsNumber, IsEnum, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { EstadoOrden, EstadoPago } from '@prisma/client';

export class OrderItemDto {
    @IsUUID()
    @IsNotEmpty()
    productId: string;

    @IsNumber()
    @Type(() => Number)
    @Min(1)
    @IsNotEmpty()
    quantity: number;
}

export class CreateOrderDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    @IsNotEmpty()
    items: OrderItemDto[];
}

export class UpdateOrderStatusDto {
    @IsEnum(EstadoOrden)
    @IsNotEmpty()
    estado: EstadoOrden;
}

export class UpdateOrderPaymentDto {
    @IsEnum(EstadoPago)
    @IsNotEmpty()
    pago: EstadoPago;

    @IsString()
    @IsOptional()
    numeroFactura?: string;
    }
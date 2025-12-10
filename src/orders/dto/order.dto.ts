import { IsNotEmpty, IsArray, ValidateNested, IsUUID, IsNumber, IsEnum, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EstadoOrden, EstadoPago } from '@prisma/client';

export class OrderItemDto {
    @ApiProperty({ example: '7c3a6ca2-3c25-4d3f-9e29-6177720f4e36' })
    @IsUUID()
    @IsNotEmpty()
    productId: string;

    @ApiProperty({ example: 2 })
    @IsNumber()
    @Type(() => Number)
    @Min(1)
    @IsNotEmpty()
    quantity: number;
}

export class CreateOrderDto {
    @ApiProperty({
        type: [OrderItemDto],
        example: [{ productId: 'uuid', quantity: 2 }],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    @IsNotEmpty()
    items: OrderItemDto[];
}

export class UpdateOrderStatusDto {
    @ApiProperty({ enum: EstadoOrden, example: EstadoOrden.CANCELADO })
    @IsEnum(EstadoOrden)
    @IsNotEmpty()
    estado: EstadoOrden;
}

export class UpdateOrderPaymentDto {
    @ApiProperty({ enum: EstadoPago, example: EstadoPago.PAGADO })
    @IsEnum(EstadoPago)
    @IsNotEmpty()
    pago: EstadoPago;

    @ApiPropertyOptional({ example: 'F-234233' })
    @IsString()
    @IsOptional()
    numeroFactura?: string;
}

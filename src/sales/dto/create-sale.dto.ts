import { IsArray, IsNotEmpty, IsString, ValidateNested, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SaleItemDto {
    @ApiProperty({ example: 'uuid-product', description: 'ID del producto vendido' })
    @IsString()
    @IsNotEmpty()
    productId: string;

    @ApiProperty({ example: 2, description: 'Cantidad comprada' })
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    quantity: number;

    @ApiProperty({ example: 1500, description: 'Precio del producto en el momento de la venta' })
    @IsNumber()
    @Min(0)
    @Type(() => Number)
    price: number;
}

export class CreateSaleDto {
    @ApiProperty({ example: 'uuid-user', description: 'ID del usuario que realiza la compra' })
    @IsString()
    @IsNotEmpty()
    userId: string;

    @ApiProperty({ type: [SaleItemDto], description: 'Lista de productos vendidos' })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SaleItemDto)
    items: SaleItemDto[];
}

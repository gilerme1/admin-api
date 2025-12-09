import { IsArray, IsNotEmpty, IsString, ValidateNested, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class SaleItemDto {
    @IsString()
    @IsNotEmpty()
    productId: string;

    @IsNumber()
    @Min(1)
    @Type(() => Number)
    quantity: number;

    @IsNumber()
    @Min(0)
    @Type(() => Number)
    price: number; // price at time of sale
}

export class CreateSaleDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SaleItemDto)
    items: SaleItemDto[];
}

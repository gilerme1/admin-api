import { IsNotEmpty, IsOptional, IsString, IsNumber, IsEnum, IsArray, IsUUID, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Genero, EstadoProducto } from '@prisma/client';

export class CreateProductDto {
    @ApiProperty({ example: 'Nike Air Force 1' })
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @ApiPropertyOptional({ example: 'Zapatilla clásica de Nike' })
    @IsString()
    @IsOptional()
    descripcion?: string;

    @ApiProperty({ enum: Genero, example: Genero.HOMBRE })
    @IsEnum(Genero)
    @IsNotEmpty()
    genero: Genero;

    @ApiProperty({ example: 'Nike' })
    @IsString()
    @IsNotEmpty()
    marca: string;

    @ApiProperty({ example: 12000 })
    @IsNumber()
    @Type(() => Number)
    @Min(0)
    @IsNotEmpty()
    precio: number;

    @ApiPropertyOptional({ type: [String], example: ['img1.png', 'img2.jpg'] })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    imagenes?: string[];

    @ApiPropertyOptional({ example: 150 })
    @IsNumber()
    @Type(() => Number)
    @Min(0)
    @IsOptional()
    stock?: number;

    @ApiPropertyOptional({ enum: EstadoProducto, example: EstadoProducto.ACTIVO })
    @IsEnum(EstadoProducto)
    @IsOptional()
    estado?: EstadoProducto;

    @ApiProperty({ example: 'b1a1e4d5-9d6c-4cec-aa25-99c376a8e477' })
    @IsUUID()
    @IsNotEmpty()
    categoryId: string;
}

export class UpdateProductDto {
    @ApiPropertyOptional({ example: 'Nike Air Max' })
    @IsString()
    @IsOptional()
    nombre?: string;

    @ApiPropertyOptional({ example: 'Nuevo modelo' })
    @IsString()
    @IsOptional()
    descripcion?: string;

    @ApiPropertyOptional({ enum: Genero })
    @IsEnum(Genero)
    @IsOptional()
    genero?: Genero;

    @ApiPropertyOptional({ example: 'Nike' })
    @IsString()
    @IsOptional()
    marca?: string;

    @ApiPropertyOptional({ example: 15000 })
    @IsNumber()
    @Type(() => Number)
    @Min(0)
    @IsOptional()
    precio?: number;

    @ApiPropertyOptional({ type: [String] })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    imagenes?: string[];

    @ApiPropertyOptional({ example: 100 })
    @IsNumber()
    @Type(() => Number)
    @Min(0)
    @IsOptional()
    stock?: number;

    @ApiPropertyOptional({ enum: EstadoProducto })
    @IsEnum(EstadoProducto)
    @IsOptional()
    estado?: EstadoProducto;

    @ApiPropertyOptional({ example: 'b1a1e4d5-9d6c-4cec-aa25-99c376a8e477' })
    @IsUUID()
    @IsOptional()
    categoryId?: string;
}

export class UpdateStockDto {
    @ApiProperty({ example: 50 })
    @IsNumber()
    @Type(() => Number)
    @Min(0)
    @IsNotEmpty()
    stock: number;
}

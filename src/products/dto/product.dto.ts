import { IsNotEmpty, IsOptional, IsString, IsNumber, IsEnum, IsArray, IsUUID, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { Genero, EstadoProducto } from '@prisma/client';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsString()
    @IsOptional()
    descripcion?: string;

    @IsEnum(Genero)
    @IsNotEmpty()
    genero: Genero;

    @IsString()
    @IsNotEmpty()
    marca: string;

    @IsNumber()
    @Type(() => Number)
    @Min(0)
    @IsNotEmpty()
    precio: number;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    imagenes?: string[];

    @IsNumber()
    @Type(() => Number)
    @Min(0)
    @IsOptional()
    stock?: number;

    @IsEnum(EstadoProducto)
    @IsOptional()
    estado?: EstadoProducto;

    @IsUUID()
    @IsNotEmpty()
    categoryId: string;
}

export class UpdateProductDto {
    @IsString()
    @IsOptional()
    nombre?: string;

    @IsString()
    @IsOptional()
    descripcion?: string;

    @IsEnum(Genero)
    @IsOptional()
    genero?: Genero;

    @IsString()
    @IsOptional()
    marca?: string;

    @IsNumber()
    @Type(() => Number)
    @Min(0)
    @IsOptional()
    precio?: number;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    imagenes?: string[];

    @IsNumber()
    @Type(() => Number)
    @Min(0)
    @IsOptional()
    stock?: number;

    @IsEnum(EstadoProducto)
    @IsOptional()
    estado?: EstadoProducto;

    @IsUUID()
    @IsOptional()
    categoryId?: string;
}

export class UpdateStockDto {
    @IsNumber()
    @Type(() => Number)
    @Min(0)
    @IsNotEmpty()
    stock: number;
}
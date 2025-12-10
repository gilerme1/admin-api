import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
    @ApiProperty({ example: 'Calzado' })
    @IsString()
    @IsNotEmpty()
    nombre: string;
}

export class UpdateCategoryDto {
    @ApiPropertyOptional({ example: 'Zapatillas' })
    @IsString()
    @IsOptional()
    nombre?: string;
}

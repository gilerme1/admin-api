import { IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty({ example: 'Juan', required: false })
    @IsString()
    @IsOptional()
    nombre?: string;

    @ApiProperty({ example: '099123456', required: false })
    @IsString()
    @IsOptional()
    tel?: string;

    @ApiProperty({ example: 'Av. Siempre Viva 123', required: false })
    @IsString()
    @IsOptional()
    direccion?: string;

    @ApiProperty({ example: '123456', required: false })
    @IsString()
    @MinLength(6)
    @IsOptional()
    password?: string;
}

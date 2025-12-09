import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    nombre?: string;

    @IsString()
    @IsOptional()
    tel?: string;

    @IsString()
    @IsOptional()
    direccion?: string;

    @IsString()
    @MinLength(6)
    @IsOptional()
    password?: string;
}
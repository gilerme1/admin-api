import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
    @ApiProperty({ example: 'cliente@gmail.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: '123456' })
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string;

    @ApiProperty({ example: 'Juan Pérez' })
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @ApiPropertyOptional({ example: '094123456' })
    @IsString()
    @IsOptional()
    tel?: string;

    @ApiPropertyOptional({ example: 'Av. Italia 1234' })
    @IsString()
    @IsOptional()
    direccion?: string;
}

export class LoginDto {
    @ApiProperty({ example: 'cliente@gmail.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: '123456' })
    @IsString()
    @IsNotEmpty()
    password: string;
}

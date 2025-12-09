import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    nombre: string;
}

export class UpdateCategoryDto {
    @IsString()
    @IsOptional()
    nombre?: string;
}

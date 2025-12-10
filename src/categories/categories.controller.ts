import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) {}

    @Post()
    @ApiOperation({ summary: 'Crear nueva categoría' })
    @ApiBody({ type: CreateCategoryDto })
    @ApiResponse({ status: 201 })
    create(@Body() dto: CreateCategoryDto) {
      return this.categoriesService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar categorías' })
    @ApiResponse({ status: 200 })
    findAll() {
      return this.categoriesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener categoría por ID' })
    @ApiParam({ name: 'id' })
    findOne(@Param('id') id: string) {
      return this.categoriesService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Editar una categoría' })
    @ApiParam({ name: 'id' })
    @ApiBody({ type: UpdateCategoryDto })
    update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
      return this.categoriesService.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar categoría' })
    @ApiParam({ name: 'id' })
    remove(@Param('id') id: string) {
      return this.categoriesService.remove(id);
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
    constructor(private prisma: PrismaService) {}

    create(dto: CreateCategoryDto) {
      return this.prisma.category.create({
        data: { nombre: dto.nombre },
      });
    }

    findAll() {
      return this.prisma.category.findMany({
        include: {
          _count: { select: { products: true } },
        },
      });
    }

    async findOne(id: string) {
      const category = await this.prisma.category.findUnique({
        where: { id },
        include: {
          products: {
            select: {
              id: true,
              nombre: true,
              precio: true,
              imagenes: true,
              stock: true,
            },
          },
        },
      });

      if (!category) {
        throw new NotFoundException('Categoría no encontrada');
      }

      return category;
    }

    async update(id: string, dto: UpdateCategoryDto) {
      await this.findOne(id);

      return this.prisma.category.update({
        where: { id },
        data: { ...dto },
      });
    }

    async remove(id: string) {
      await this.findOne(id);

      await this.prisma.category.delete({ where: { id } });

      return { message: 'Categoría eliminada exitosamente' };
    }
}

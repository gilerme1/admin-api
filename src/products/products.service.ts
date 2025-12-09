import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto, UpdateStockDto } from './dto/product.dto';
import { Genero, EstadoProducto } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductDto) {
    const category = await this.prisma.category.findUnique({
      where: { id: dto.categoryId },
    });

    if (!category) {
      throw new NotFoundException('Categoría no encontrada');
    }

    return this.prisma.product.create({
      data: {
        nombre: dto.nombre,
        descripcion: dto.descripcion,
        genero: dto.genero,
        marca: dto.marca,
        precio: dto.precio,
        imagenes: dto.imagenes || [],
        stock: dto.stock || 0,
        estado: dto.estado || EstadoProducto.ACTIVO,
        categoryId: dto.categoryId,
      },
      include: {
        category: true,
      },
    });
  }

  async findAll(filters?: {
    genero?: Genero;
    marca?: string;
    categoryId?: string;
    minPrecio?: number;
    maxPrecio?: number;
    estado?: EstadoProducto;
  }) {
    const where: any = {};

    if (filters) {
      if (filters.genero) where.genero = filters.genero;
      if (filters.marca) where.marca = { contains: filters.marca, mode: 'insensitive' };
      if (filters.categoryId) where.categoryId = filters.categoryId;
      if (filters.estado) where.estado = filters.estado;

      if (filters.minPrecio || filters.maxPrecio) {
        where.precio = {};
        if (filters.minPrecio) where.precio.gte = filters.minPrecio;
        if (filters.maxPrecio) where.precio.lte = filters.maxPrecio;
      }
    }

    return this.prisma.product.findMany({
      where,
      include: {
        category: {
          select: {
            id: true,
            nombre: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
      const product = await this.prisma.product.findUnique({
        where: { id },
        include: {
          category: true,  // <--- SIN parent
        },
      });

      if (!product) {
        throw new NotFoundException('Producto no encontrado');
      }

      return product;
  }

  async update(id: string, dto: UpdateProductDto) {
    await this.findOne(id);

    if (dto.categoryId) {
      const category = await this.prisma.category.findUnique({
        where: { id: dto.categoryId },
      });

      if (!category) {
        throw new NotFoundException('Categoría no encontrada');
      }
    }

    return this.prisma.product.update({
      where: { id },
      data: dto,
      include: {
        category: true,
      },
    });
  }

  async updateStock(id: string, dto: UpdateStockDto) {
    await this.findOne(id);

    return this.prisma.product.update({
      where: { id },
      data: { stock: dto.stock },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.product.delete({
      where: { id },
    });

    return { message: 'Producto eliminado exitosamente' };
  }

  async decrementStock(id: string, quantity: number) {
    const product = await this.findOne(id);

    if (product.stock < quantity) {
      throw new BadRequestException(
        `Stock insuficiente para ${product.nombre}. Disponible: ${product.stock}`,
      );
    }

    return this.prisma.product.update({
      where: { id },
      data: {
        stock: {
          decrement: quantity,
        },
      },
    });
  }

  async incrementStock(id: string, quantity: number) {
    return this.prisma.product.update({
      where: { id },
      data: {
        stock: {
          increment: quantity,
        },
      },
    });
  }
}
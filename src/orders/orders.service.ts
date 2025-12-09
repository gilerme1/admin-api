import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductsService } from '../products/products.service';
import { CreateOrderDto, UpdateOrderStatusDto, UpdateOrderPaymentDto } from './dto/order.dto';
import { EstadoOrden, EstadoPago } from '@prisma/client';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrdersService {
    constructor(
        private prisma: PrismaService,
        private productsService: ProductsService,
    ) {}

    async create(userId: string, dto: CreateOrderDto) {
        if (!dto.items || dto.items.length === 0) {
        throw new BadRequestException('La orden debe tener al menos un producto');
        }

        let total = 0;
        const orderItems: Prisma.OrderItemCreateWithoutOrderInput[] = [];

        for (const item of dto.items) {
            const product = await this.productsService.findOne(item.productId);

            if (product.stock < item.quantity) {
                throw new BadRequestException(
                    `Stock insuficiente para ${product.nombre}. Disponible: ${product.stock}`,
                );
            }

            total += product.precio * item.quantity;

            orderItems.push({
            quantity: item.quantity,
            price: product.precio,
            product: {
                connect: { id: product.id },
            },
        });

        }

        const order = await this.prisma.order.create({
        data: {
            userId,
            total,
            items: {
            create: orderItems,
            },
        },
        include: {
            items: {
            include: {
                product: true,
            },
            },
            user: {
            select: {
                id: true,
                nombre: true,
                email: true,
            },
            },
        },
        });

        for (const item of dto.items) {
        await this.productsService.decrementStock(item.productId, item.quantity);
        }

        return order;
    }

    async findAllByUser(userId: string) {
        return this.prisma.order.findMany({
        where: { userId },
        include: {
            items: {
            include: {
                product: {
                select: {
                    id: true,
                    nombre: true,
                    imagenes: true,
                },
                },
            },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
        });
    }

    async findAll(filters?: { estado?: EstadoOrden; pago?: EstadoPago }) {
        const where: any = {};

        if (filters) {
        if (filters.estado) where.estado = filters.estado;
        if (filters.pago) where.pago = filters.pago;
        }

        return this.prisma.order.findMany({
        where,
        include: {
            items: {
            include: {
                product: {
                select: {
                    id: true,
                    nombre: true,
                    imagenes: true,
                },
                },
            },
            },
            user: {
            select: {
                id: true,
                nombre: true,
                email: true,
            },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
        });
    }

    async findOne(id: string, userId: string) {
        const order = await this.prisma.order.findUnique({
        where: { id },
        include: {
            items: {
            include: {
                product: true,
            },
            },
            user: {
            select: {
                id: true,
                nombre: true,
                email: true,
                tel: true,
                direccion: true,
            },
            },
        },
        });

        if (!order) {
        throw new NotFoundException('Orden no encontrada');
        }

        if (order.userId !== userId) {
        throw new ForbiddenException('No tienes permiso para ver esta orden');
        }

        return order;
    }

    async updateStatus(id: string, dto: UpdateOrderStatusDto) {
        const order = await this.prisma.order.findUnique({
        where: { id },
        });

        if (!order) {
        throw new NotFoundException('Orden no encontrada');
        }

        return this.prisma.order.update({
        where: { id },
        data: { estado: dto.estado },
        include: {
            items: {
            include: {
                product: true,
            },
            },
        },
        });
    }

    async updatePayment(id: string, dto: UpdateOrderPaymentDto) {
        const order = await this.prisma.order.findUnique({
        where: { id },
        });

        if (!order) {
        throw new NotFoundException('Orden no encontrada');
        }

        const updateData: any = { pago: dto.pago };
        if (dto.numeroFactura) {
        updateData.numeroFactura = dto.numeroFactura;
        }

        return this.prisma.order.update({
        where: { id },
        data: updateData,
        });
    }

    async cancel(id: string, userId: string) {
        const order = await this.prisma.order.findUnique({
        where: { id },
        include: {
            items: true,
        },
        });

        if (!order) {
        throw new NotFoundException('Orden no encontrada');
        }

        if (order.userId !== userId) {
        throw new ForbiddenException('No tienes permiso para cancelar esta orden');
        }

        for (const item of order.items) {
        await this.productsService.incrementStock(item.productId, item.quantity);
        }

        await this.prisma.order.update({
        where: { id },
        data: { estado: EstadoOrden.CANCELADO },
        });

        await this.prisma.order.delete({
        where: { id },
        });

        return { message: 'Orden cancelada exitosamente' };
    }
}
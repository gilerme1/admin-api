import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSaleDto } from './dto/create-sale.dto';

@Injectable()
export class SalesService {
    constructor(private readonly prisma: PrismaService) {}

    async create(dto: CreateSaleDto) {
        // 1. Validar usuario existente
        const user = await this.prisma.user.findUnique({
        where: { id: dto.userId },
        });

        if (!user) {
        throw new BadRequestException('El usuario no existe.');
        }

       // 2. Obtener productos involucrados
        const productIds = dto.items.map(i => i.productId);

        const products = await this.prisma.product.findMany({
        where: { id: { in: productIds } },
        });

        // Validar productos uno por uno
        for (const item of dto.items) {
        const product = products.find(p => p.id === item.productId);

        if (!product) {
            throw new BadRequestException(
            `Producto no encontrado: ${item.productId}`
            );
        }

        if (product.stock < item.quantity) {
            throw new BadRequestException(
            `Stock insuficiente para "${product.nombre}". Disponible: ${product.stock}, solicitado: ${item.quantity}`
            );
        }
        }

        // 3. Validar stock simple (evita caer en la transacción si falta stock)
        for (const item of dto.items) {
        const product = products.find(p => p.id === item.productId);

        if (!product) {
            throw new BadRequestException(
            `Producto no encontrado: ${item.productId}`,
            );
        }

        if (product.stock < item.quantity) {
            throw new BadRequestException(
            `Stock insuficiente para "${product.nombre}". Disponible: ${product.stock}, solicitado: ${item.quantity}`,
            );
        }
        }

        // 4. Calcular total de forma simple (sin comparaciones)
        const total = dto.items.reduce(
        (acc, it) => acc + it.price * it.quantity,
        0,
        );

        // 5. Ejecutar todo dentro de una transacción
        return this.prisma.$transaction(async tx => {
        // 5.1 Crear la orden
        const order = await tx.order.create({
            data: {
            userId: dto.userId,
            total,
            },
        });

        // 5.2 Crear los items de la orden
        await tx.orderItem.createMany({
            data: dto.items.map(i => ({
            orderId: order.id,
            productId: i.productId,
            price: i.price,
            quantity: i.quantity,
            })),
        });

        // 5.3 Descontar stock de manera segura
        const updates = await Promise.all(
            dto.items.map(item =>
            tx.product.updateMany({
                where: {
                id: item.productId,
                stock: { gte: item.quantity },
                },
                data: {
                stock: { decrement: item.quantity },
                },
            }),
            ),
        );

        // Si algún updateMany no afectó filas → stock insuficiente
        if (updates.some(u => u.count === 0)) {
            throw new BadRequestException(
            'Stock insuficiente para alguno de los productos.',
            );
        }

        // 6. Devolver orden con detalles
        return tx.order.findUnique({
            where: { id: order.id },
            include: {
            items: { include: { product: true } },
            user: true,
            },
        });
        });
    }

    async findAll() {
        return this.prisma.order.findMany({
        include: {
            items: { include: { product: true } },
            user: true,
        },
        orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(id: string) {
        const order = await this.prisma.order.findUnique({
        where: { id },
        include: {
            items: { include: { product: true } },
            user: true,
        },
        });

        if (!order) throw new NotFoundException('Orden de compra no encontrada');
        return order;
    }
}

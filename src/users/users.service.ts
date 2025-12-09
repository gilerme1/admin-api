import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findMe(userId: string) {
        const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            nombre: true,
            tel: true,
            direccion: true,
            createdAt: true,
            updatedAt: true,
        },
        });

        if (!user) {
        throw new NotFoundException('Usuario no encontrado');
        }

        return user;
    }

    async update(userId: string, dto: UpdateUserDto) {
        const updateData: any = {
        nombre: dto.nombre,
        tel: dto.tel,
        direccion: dto.direccion,
        };

        if (dto.password) {
        updateData.password = await bcrypt.hash(dto.password, 10);
        }

        return this.prisma.user.update({
        where: { id: userId },
        data: updateData,
        select: {
            id: true,
            email: true,
            nombre: true,
            tel: true,
            direccion: true,
            updatedAt: true,
        },
        });
    }

    async remove(userId: string) {
        await this.prisma.user.delete({
        where: { id: userId },
        });

        return { message: 'Cuenta eliminada exitosamente' };
    }

    async findAll() {
        return this.prisma.user.findMany({
        select: {
            id: true,
            email: true,
            nombre: true,
            tel: true,
            direccion: true,
            createdAt: true,
        },
        });
    }
}
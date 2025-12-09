import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async register(dto: RegisterDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (existingUser) {
        throw new ConflictException('El usuario ya existe');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: hashedPassword,
                nombre: dto.nombre,
                tel: dto.tel,
                direccion: dto.direccion,
            },
            select: {
                id: true,
                email: true,
                nombre: true,
                tel: true,
                direccion: true,
                createdAt: true,
            },
        });

        return {
            message: 'Usuario registrado exitosamente',
            user,
        };
    }

    async login(dto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const validPassword = await bcrypt.compare(dto.password, user.password);

        if (!validPassword) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const payload = { sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload);

        // ← CAMBIO CLAVE: usar "access_token" en lugar de "token"
        return {
            access_token: token,   // ← Aquí está la corrección
            user: {
                id: user.id,
                email: user.email,
                nombre: user.nombre,
            },
        };
    }
}
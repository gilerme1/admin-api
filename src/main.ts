import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Validación global
    app.useGlobalPipes(
        new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        }),
    );

    // CORS para producción + local
    app.enableCors({
        origin: [
        'https://admin-panel.vercel.app',
        'http://localhost:3000',
        ],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });

    // Prefijo global
    app.setGlobalPrefix('api');

    // --- Swagger ---
    const config = new DocumentBuilder()
        .setTitle('Admin API')
        .setDescription('Documentación de la API del administrador')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    // Forzar inicialización de Prisma
    const prismaService = app.get(PrismaService);
    await prismaService.onModuleInit();

    // Iniciar servidor
    const port = process.env.PORT || 3001;
    await app.listen(port);

    console.log(`🚀 Aplicación corriendo en: http://localhost:${port}`);
    console.log(`📚 API disponible en: http://localhost:${port}/api`);
}

bootstrap().catch((err) => {
    console.error('Error al iniciar la aplicación NestJS:', err);
    process.exit(1);
});

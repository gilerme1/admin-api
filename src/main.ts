import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        }),
    );

    app.enableCors({
        origin: true,   
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });

    app.setGlobalPrefix('api');

    const config = new DocumentBuilder()
        .setTitle('Admin API')
        .setDescription('Documentación de la API del administrador')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    const prismaService = app.get(PrismaService);
    await prismaService.onModuleInit();

    const port = process.env.PORT || 3001;
    await app.listen(port);

    console.log(`🚀 Aplicación corriendo en: http://localhost:${port}`);
    console.log(`📚 API disponible en: http://localhost:${port}/api`);
}

bootstrap().catch((err) => {
    console.error('Error al iniciar la aplicación NestJS:', err);
    process.exit(1);
});

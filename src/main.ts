/* eslint-disable no-irregular-whitespace */
// src/main.ts

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
// ⚠️ Importar el servicio de Prisma para forzar la inicialización
import { PrismaService } from './prisma/prisma.service'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors();
  app.setGlobalPrefix('api');

  // --- 1. Obtener y Esperar la Inicialización de Prisma ---
  const prismaService = app.get(PrismaService);
  // await llama a onModuleInit() y espera a que los reintentos terminen
  await prismaService.onModuleInit(); 

  // --- 2. Iniciar el Servidor SOLO después de la conexión a la DB ---
  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`🚀 Aplicación corriendo en: http://localhost:${port}`);
  console.log(`📚 API disponible en: http://localhost:${port}/api`);
}

bootstrap().catch((err) => {
  console.error('Error al iniciar la aplicación NestJS:', err);
  process.exit(1); 
});
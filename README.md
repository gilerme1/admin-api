<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

# 🎾 Tennis Star - Backend API

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

API RESTful para sistema de gestión de inventario de e-commerce deportivo, desarrollada con NestJS, Prisma y PostgreSQL.

---

## 📋 Tabla de Contenidos

- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Endpoints API](#endpoints-api)
- [Base de Datos](#base-de-datos)
- [Decisiones Técnicas](#decisiones-técnicas)

---

## ✨ Características

- ✅ **Autenticación JWT** con bcrypt para hash de contraseñas
- ✅ **CRUD completo** de Categorías, Productos y Ventas
- ✅ **Gestión de stock** con validación en transacciones
- ✅ **Prisma ORM** con migraciones automáticas
- ✅ **Validación de DTOs** con class-validator
- ✅ **Arquitectura modular** siguiendo principios SOLID

---

## 📦 Requisitos Previos

- Node.js >= 18.x
- PostgreSQL >= 14.x
- npm o yarn

---

## 🚀 Instalación

```bash
# Clonar repositorio
git clone <repo-url>
cd prueba-api

# Instalar dependencias
npm install
```

---

## ⚙️ Configuración

Crear archivo `.env` en la raíz del proyecto:

```env
# Database
DATABASE_URL="postgresql://usuario:password@localhost:5432/tennis_star"

# Supabase (opcional)
SUPABASE_URL="https://tu-proyecto.supabase.co"
SUPABASE_SECRET_KEY="tu_secret_key"
SUPABASE_ANON_KEY="tu_anon_key"

# JWT
JWT_SECRET="tu_secreto_super_seguro_aqui"
JWT_EXPIRES_IN="2h"

# Server
PORT=3000
```

**Configurar Prisma:**

```bash
# Generar cliente Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev

# (Opcional) Seed de datos
npx prisma db seed
```

---

## 🏃 Ejecución

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod

# Testing
npm run test
```

La API estará disponible en `http://localhost:3000/api`

---

## 📂 Estructura del Proyecto

```
src/
├── auth/               # Autenticación JWT
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── dto/
├── categories/         # CRUD Categorías
│   ├── categories.controller.ts
│   ├── categories.service.ts
│   └── dto/
├── products/          # CRUD Productos
│   ├── products.controller.ts
│   ├── products.service.ts
│   └── dto/
├── sales/             # Gestión de Ventas
│   ├── sales.controller.ts
│   ├── sales.service.ts
│   └── dto/
├── users/             # Gestión de Usuarios
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── dto/
├── prisma/            # Cliente Prisma
│   └── prisma.service.ts
└── main.ts            # Entry point
```

---

## 🔌 Endpoints API

### **Autenticación**

```http
POST   /api/auth/login       # Login con email/password
POST   /api/auth/register    # Registro de usuario
```

### **Usuarios**

```http
GET    /api/users/me         # Perfil del usuario autenticado
PATCH  /api/users/me         # Actualizar perfil
DELETE /api/users/me         # Eliminar cuenta
GET    /api/users            # Listar usuarios (admin)
```

### **Categorías**

```http
GET    /api/categories       # Listar categorías
GET    /api/categories/:id   # Ver categoría
POST   /api/categories       # Crear categoría
PATCH  /api/categories/:id   # Actualizar categoría
DELETE /api/categories/:id   # Eliminar categoría
```

### **Productos**

```http
GET    /api/products         # Listar productos (con filtros)
GET    /api/products/:id     # Ver producto
POST   /api/products         # Crear producto
PATCH  /api/products/:id     # Actualizar producto
DELETE /api/products/:id     # Eliminar producto
```

**Filtros disponibles:**
- `?genero=HOMBRE|MUJER|NINO`
- `?marca=Nike`
- `?categoryId=uuid`
- `?minPrecio=100&maxPrecio=500`
- `?estado=ACTIVO|INACTIVO`

### **Ventas**

```http
GET    /api/sales            # Listar órdenes
GET    /api/sales/:id        # Ver orden
POST   /api/sales/generate   # Generar nueva venta
```

**Ejemplo de body para generar venta:**

```json
{
  "userId": "uuid-del-usuario",
  "items": [
    {
      "productId": "uuid-del-producto",
      "quantity": 2,
      "price": 1499.99
    }
  ]
}
```

---

## 🗄️ Base de Datos

### **Schema Prisma**

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  nombre    String
  tel       String?
  direccion String?
  orders    Order[]
}

model Category {
  id        String    @id @default(uuid())
  nombre    String
  products  Product[]
}

model Product {
  id          String         @id @default(uuid())
  nombre      String
  descripcion String?
  genero      Genero
  marca       String
  precio      Float
  imagenes    String[]
  stock       Int            @default(0)
  estado      EstadoProducto @default(ACTIVO)
  categoryId  String
  category    Category       @relation(fields: [categoryId], references: [id])
}

model Order {
  id        String      @id @default(uuid())
  userId    String
  user      User        @relation(fields: [userId], references: [id])
  total     Float
  items     OrderItem[]
  createdAt DateTime    @default(now())
}

enum Genero {
  HOMBRE
  MUJER
  NINO
}

enum EstadoProducto {
  ACTIVO
  INACTIVO
}
```

---

## 💡 Decisiones Técnicas

### **¿Por qué NestJS?**
- Arquitectura modular escalable
- Inyección de dependencias nativa
- TypeScript de primera clase
- Excelente para APIs REST y microservicios

### **¿Por qué Prisma?**
- Type-safety completo con TypeScript
- Migraciones automáticas y reversibles
- Query builder intuitivo
- Excelente performance con PostgreSQL

### **Transacciones para Ventas**
Las ventas utilizan transacciones de Prisma (`$transaction`) para garantizar:
1. Validación de stock disponible
2. Creación de la orden
3. Descuento atómico del stock
4. Rollback automático si algo falla

```typescript
return this.prisma.$transaction(async tx => {
  const order = await tx.order.create({ /* ... */ });
  await tx.product.updateMany({ /* decrement stock */ });
  return order;
});
```

### **Validación de DTOs**
Uso de `class-validator` para validar requests:
- `@IsString()`, `@IsNumber()`, `@Min()`, etc.
- Validación automática en el pipeline de NestJS
- Mensajes de error claros y consistentes

---

## 📝 Comandos Útiles

```bash
# Regenerar cliente Prisma después de cambios en schema
npx prisma generate

# Ver base de datos en interfaz web
npx prisma studio

# Crear nueva migración
npx prisma migrate dev --name nombre_migracion

# Reset base de datos (¡CUIDADO!)
npx prisma migrate reset

# Formatear código
npm run format

# Lint
npm run lint
```




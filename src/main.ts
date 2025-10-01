// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; // <-- IMPORTA ESTO

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // --- INICIA CONFIGURACIÓN DE SWAGGER ---
  const config = new DocumentBuilder()
    .setTitle('Task Manager API')
    .setDescription('La API para nuestro proyecto de gestión de tareas')
    .setVersion('1.0')
    .addTag('tasks') // Agruparemos nuestros endpoints bajo la etiqueta "tasks"
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // La URL será http://localhost:3000/api-docs
  // --- TERMINA CONFIGURACIÓN DE SWAGGER ---

  await app.listen(3000);
}
bootstrap().catch((err) => console.error(err));

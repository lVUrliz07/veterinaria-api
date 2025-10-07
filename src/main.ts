// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefijo global para todas las rutas
  app.setGlobalPrefix('api');

  // ¡ESTA ES LA LÍNEA QUE AÑADIMOS!
  // Le da permiso al frontend para que se pueda comunicar con nuestra API.
  app.enableCors({
    origin: '*', // Permite todas las origines
    credentials: true,
  });

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
    .addTag('tasks')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  // --- TERMINA CONFIGURACIÓN DE SWAGGER ---

  await app.listen(3000, '0.0.0.0');
}
bootstrap().catch((err) => console.error(err));

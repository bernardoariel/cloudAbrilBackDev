import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });
  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('ABRIL')
    .setDescription('ENDPOINTS de Abril Amoblamientos')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Elimina propiedades no esperadas
    forbidNonWhitelisted: true, // Error si hay propiedades no esperadas
    transform: true // Transforma automáticamente a tipos de TS
  }));
  await app.listen(3000);
}
bootstrap();

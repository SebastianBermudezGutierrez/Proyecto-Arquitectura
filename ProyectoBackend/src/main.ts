import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express'; // 👈 agregar
import { join } from 'path'; // 👈 agregar

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); // 👈 cambiar tipo

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // 👈 agregar esto antes del listen
  app.useStaticAssets(join(__dirname, '..', '..', 'frontend', 'www'));

  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
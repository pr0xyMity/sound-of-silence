import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      // Used for implicit conversion of query params
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

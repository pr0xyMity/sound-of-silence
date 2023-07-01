import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  // Swagger
  const options = new DocumentBuilder()
    .setTitle('Sound of silence')
    .setDescription(
      'About A revolutionary app designed to enhance your reading experience by immersing you in a world of soundscapes that perfectly complement each chapter of your favorite book. Sound of Silence brings literature to life by adding an auditory dimension, creating a captivating and immersive storytelling experience like never before.',
    )
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

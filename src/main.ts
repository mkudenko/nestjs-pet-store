import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function generateDocsOnPath(app, path) {
  const config = new DocumentBuilder()
    .setTitle('Pet Store')
    .setDescription('Pet Store API documentation')
    .setVersion('1.0')
    .addTag('pets')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(path, app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  generateDocsOnPath(app, 'api');

  await app.listen(3001);
}
bootstrap();

import {Logger, ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app/app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

const DEFAULT_APP_PORT = 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('The «Users» service')
    .setDescription('Users service API')
    .setVersion('1.0')
    .build();
  const port = process.env.PORT || DEFAULT_APP_PORT;
  const globalPrefix = 'api';
  const document = SwaggerModule.createDocument(app, config);

  app.setGlobalPrefix(globalPrefix);
  SwaggerModule.setup('spec', app, document);
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();

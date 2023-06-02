import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { OgmaService } from '@ogma/nestjs-module';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestjsSwagger } from '@anatine/zod-nestjs';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    bufferLogs: false,
  });

  const config = app.get<ConfigService>(ConfigService);

  app.enableCors();

  const logger = app.get(OgmaService);

  const swagger = new DocumentBuilder()
    .setTitle('Image optimizer')
    .setDescription('Optimize images')
    .setVersion('1.0.0')
    .build();

  patchNestjsSwagger();

  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.getPort(), '0.0.0.0', () => {
    logger.info(`Application is listening on port: ${config.getPort()}`, 'NestApplication#listen');
  });
}
bootstrap();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { OgmaService } from '@ogma/nestjs-module';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    logger: false,
    bufferLogs: true,
  });

  const config = app.get<ConfigService>(ConfigService);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.enableCors();

  const logger = app.get(OgmaService);

  app.useLogger(logger);

  await app.listen(config.getPort(), '0.0.0.0', () => {
    logger.info(`Application is listening on port: ${config.getPort()}`, 'NestApplication#listen');
  });
}
bootstrap();

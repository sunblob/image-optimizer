import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { OgmaInterceptor, OgmaModule } from '@ogma/nestjs-module';
import { FastifyParser } from '@ogma/platform-fastify';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { OgmaConfig } from './config/ogma.config';
import { OptimizerModule } from './optimizer/optimizer.module';

@Module({
  imports: [
    ConfigModule,
    OgmaModule.forRootAsync({
      useClass: OgmaConfig,
      imports: [ConfigModule],
    }),
    OptimizerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: OgmaInterceptor,
    },
  ],
})
export class AppModule {}

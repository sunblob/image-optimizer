import { Injectable } from '@nestjs/common';
import { OgmaModuleOptions } from '@ogma/nestjs-module';
import { FastifyParser } from '@ogma/platform-fastify';
import { ConfigService } from './config.service';

@Injectable()
export class OgmaConfig {
  constructor(private config: ConfigService) {}

  createModuleConfig(): OgmaModuleOptions {
    return {
      service: {
        color: true,
        json: this.config.isProd(),
        logLevel: this.config.isProd() ? 'DEBUG' : 'ALL',
        application: this.config.getName(),
      },
      interceptor: {
        http: FastifyParser,
      },
    };
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService as NativeConfigService } from '@nestjs/config';
import { Env } from './config.interface';

@Injectable()
export class ConfigService {
  public env: Env;

  constructor(private readonly config: NativeConfigService) {
    this.env = {
      port: config.get<number>('PORT'),
      name: config.get('NAME'),
    };
  }

  getName(): string {
    return this.env.name;
  }

  getPort(): number {
    return this.env.port;
  }

  isProd(): boolean {
    return this.config.get('NODE_ENV') === 'production';
  }
}

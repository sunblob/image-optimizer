import { Global, Module } from '@nestjs/common';
import { ConfigModule as NativeConfigModule } from '@nestjs/config';
import { ConfigService as NativeConfigService } from '@nestjs/config';
import { ConfigService } from './config.service';
import { OgmaConfig } from './ogma.config';

@Global()
@Module({
  imports: [NativeConfigModule.forRoot({ cache: true })],
  providers: [ConfigService, NativeConfigService, OgmaConfig],
  exports: [ConfigService, OgmaConfig],
})
export class ConfigModule {}

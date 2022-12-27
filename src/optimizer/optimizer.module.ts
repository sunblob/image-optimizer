import { Module } from '@nestjs/common';
import { OgmaModule } from '@ogma/nestjs-module';
import { OptimizerController } from './optimizer.controller';
import { OptimizerService } from './optimizer.service';

@Module({
  imports: [OgmaModule.forFeature(OptimizerService)],
  controllers: [OptimizerController],
  providers: [OptimizerService],
})
export class OptimizerModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OptimizerModule } from './optimizer/optimizer.module';

@Module({
  imports: [OptimizerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

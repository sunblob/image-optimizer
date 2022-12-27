import { Controller, Get, Query } from '@nestjs/common';
import { OptimizeImageQueryDto } from './dto/optimize-image-query.dto';
import { OptimizerService } from './optimizer.service';

@Controller('optimize')
export class OptimizerController {
  constructor(private optimizerService: OptimizerService) {}

  @Get()
  optimize(@Query() query: OptimizeImageQueryDto) {
    return this.optimizerService.optimizeImage(query);
  }
}

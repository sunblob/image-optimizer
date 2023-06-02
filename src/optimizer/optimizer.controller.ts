import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { ImageQueryDto } from './dto/optimize-image-query.dto';
import { OptimizerService } from './optimizer.service';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { ApiResponse } from '@nestjs/swagger';
import { ApiProduces } from '@nestjs/swagger';

@Controller('optimize')
@UsePipes(ZodValidationPipe)
export class OptimizerController {
  constructor(private optimizerService: OptimizerService) {}

  @ApiProduces('image/*')
  @ApiResponse({
    schema: {
      type: 'string',
      format: 'binary',
    },
  })
  @Get()
  optimize(@Query() query: ImageQueryDto) {
    return this.optimizerService.optimizeImage(query);
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import sharp from 'sharp';
import axios from 'axios';
import { ImageQueryDto } from './dto/optimize-image-query.dto';
import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';

@Injectable()
export class OptimizerService {
  constructor(
    @OgmaLogger(OptimizerService)
    private readonly logger: OgmaService,
  ) {}

  async optimizeImage({ url, width, height, format, quality }: ImageQueryDto) {
    const imageBuffer = await this.getBufferFromImage(url);

    const {
      width: originalWidth,
      height: originalHeight,
      format: originalFormat,
    } = await sharp(imageBuffer).metadata();

    if (!width) width = originalWidth;
    if (!height) height = originalHeight;
    if (!format || !format.length) format = originalFormat as typeof format;

    const image = await sharp(imageBuffer).resize({ width, height }).toFormat(format, { quality });

    return image;
  }

  async getBufferFromImage(url: string): Promise<Buffer> {
    try {
      const { data } = await axios.get(url, { responseType: 'arraybuffer' });

      return Buffer.from(data, 'binary');
    } catch (error) {
      this.logger.error(error.message, error.stack, 'getBufferFromImage');

      throw new HttpException(
        {
          message: `Couldn't get image from ${url}`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

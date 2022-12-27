import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import sharp from 'sharp';
import axios from 'axios';
import { OptimizeImageQueryDto } from './dto/optimize-image-query.dto';
import { ImageFormat } from './utils/constants';
import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';

@Injectable()
export class OptimizerService {
  constructor(
    @OgmaLogger(OptimizerService)
    private readonly logger: OgmaService,
  ) {}

  async optimizeImage({ src, size, format, quality }: OptimizeImageQueryDto) {
    const imageBuffer = await this.getBufferFromImage(src);

    const { width: originalWidth } = await sharp(imageBuffer).metadata();

    if (!size) size = originalWidth;

    const image = await sharp(imageBuffer).resize({ width: size });

    switch (format) {
      case ImageFormat.JPEG:
        image.toFormat('jpeg', { quality });
        break;

      case ImageFormat.PNG:
        image.toFormat('png', { quality });
        break;
      case ImageFormat.WEBP:
        image.toFormat('webp', { quality });
        break;
      case ImageFormat.AVIF:
        image.toFormat('avif', { quality });
      default:
        break;
    }

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

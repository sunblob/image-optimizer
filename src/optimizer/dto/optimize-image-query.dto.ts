import { z } from 'zod';
import { extendApi } from '@anatine/zod-openapi';
import { createZodDto } from '@anatine/zod-nestjs';

const ImageZ = extendApi(
  z.object({
    url: z.string().url(),
    format: z.enum(['jpeg', 'webp', 'png', 'jpg', 'avif', 'tiff']).optional(),
    width: z.coerce.number().optional(),
    height: z.coerce.number().optional(),
    quality: z.coerce.number().optional().default(95),
  }),
  {
    title: 'Image',
    description: 'image',
  },
);

export class ImageQueryDto extends createZodDto(ImageZ) {}

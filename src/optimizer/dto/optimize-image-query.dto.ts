import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
import { ImageFormat } from '../utils/constants';

export class OptimizeImageQueryDto {
  @IsUrl()
  src: string;

  @IsString()
  @IsEnum(ImageFormat, { each: true })
  format: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  size: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  quality = 95;
}

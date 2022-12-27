import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
import { ImageFormat } from '../utils/constants';

export class OptimizeImageQueryDto {
  @IsUrl()
  src: string;

  @IsString()
  // @IsIn([Object.values(ImageFormat)])
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

import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { ProductType } from '~/constants';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(1)
  @IsString()
  @IsOptional()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  name: string;

  @ApiPropertyOptional({ enum: ProductType })
  @IsOptional()
  type: string;

  @ApiPropertyOptional()
  @IsOptional()
  quantity: number;

  @ApiPropertyOptional()
  @IsOptional()
  price: number;

  @ApiPropertyOptional()
  @IsOptional()
  discount: number;

  @ApiPropertyOptional()
  @IsOptional()
  thumbnail: string;

  @ApiPropertyOptional()
  @IsOptional()
  link: string;
}

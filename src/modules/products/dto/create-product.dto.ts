import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(255, {
    message: 'タイトル must not be greater than 255 characters.',
  })
  @MinLength(1)
  @IsString()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
  @ApiProperty({
    default: 0,
  })

  @IsNotEmpty()
  @Min(0)
  @IsNumber()
  price: number;
  @ApiProperty()

  @IsNotEmpty()
  @Min(0)
  @IsNumber()
  discount: number;
  @ApiProperty()

  @IsString()
  @IsOptional()
  thumbnail: string;
  @ApiProperty()
  
  @IsNotEmpty()
  @IsString()
  link: string;
}

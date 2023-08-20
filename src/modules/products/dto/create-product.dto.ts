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
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  subjectVideo: string;

  @ApiProperty({
    default: 1,
  })
  @IsNotEmpty()
  @Min(1)
  @IsNumber()
  videoTime: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  thumbnail: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  link: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class Search {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  field: string;

  @ApiProperty()
  @IsNotEmpty()
  value: string | number;
}

enum EOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}
export class Sort {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  field: string;

  @ApiProperty({ enum: EOrder })
  @IsString()
  @IsIn(['ASC', 'DESC'])
  @IsNotEmpty()
  order: EOrder;
}

export class PaginationQueryDto {
  @ApiProperty({
    example: '1',
  })
  @IsNumber()
  @Type(() => Number)
  page: number;

  @ApiProperty({
    example: '20',
  })
  @IsNumber()
  @Type(() => Number)
  perPage: number;
}

export class PaginationBodyDto {
  @ApiProperty({ default: 1, required: false })
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  page?: number;

  @ApiProperty({ default: 10, required: false })
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  perPage?: number;

  @ApiProperty({ required: false, type: [Search] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Search)
  @IsOptional()
  search?: Search[];

  @ApiProperty({ required: false })
  @Type(() => Sort)
  @IsOptional()
  sort?: Sort;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { EServiceType } from '~/constants';

export class FindCategoryService {
  @ApiProperty({ required: false, enum: EServiceType })
  @IsString()
  @IsOptional()
  type?: string;

}

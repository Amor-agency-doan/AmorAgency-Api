import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type, plainToClass } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';

export class UserCheckout {
  @ApiProperty()
  @IsNotEmpty({ message: 'ID is required' })
  fullname: string;
}

export class ProductCheckoit {
  @IsMongoId({ message: 'ID is not match' })
  @IsNotEmpty({ message: 'ID is required' })
  @IsOptional()
  id: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Quantity is required' })
  quantity: number;
}
export class CreateCheckoutDto {
  @ApiProperty({ type: UserCheckout })
  user: UserCheckout;

  @ApiProperty({ type: ProductCheckoit, isArray: true })
  @IsOptional()
  products: string;
}

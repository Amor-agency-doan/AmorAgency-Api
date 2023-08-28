import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserCheckout {
  @ApiProperty()
  @IsNotEmpty({ message: 'ID is required' })
  @IsString()
  fullname: string;
}

export class ProductCheckout {
  @ApiProperty()
  @IsMongoId({ message: 'ID is not match' })
  @IsNotEmpty({ message: 'ID is required' })
  productId: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Quantity is required' })
  quantity: number;
}
export class CreateCheckoutDto {
  @ApiProperty({ type: UserCheckout })
  info: UserCheckout;

  @ApiProperty({ type: ProductCheckout, isArray: true })
  @IsOptional()
  products: string[];
}

import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class ProductCheckout {
  @ApiProperty()
  @IsMongoId({ message: 'ID is not match' })
  @IsNotEmpty({ message: 'ID is required' })
  productId: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Quantity is required' })
  quantity: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Price is required' })
  price: number;

  @ApiProperty({ default: 0 })
  @ApiProperty()
  discount: number;
}

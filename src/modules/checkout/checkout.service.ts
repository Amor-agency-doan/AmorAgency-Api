import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from '../orders/order.schema';
import { Model } from 'mongoose';
import { Products, ProductsDocument } from '../products/products.schema';
@Injectable()
export class CheckoutService {
  constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>,@InjectModel(Products.name) readonly productsModel: Model<ProductsDocument>) {}

  create(createCheckoutDto: CreateCheckoutDto) {
    const { info, products } = createCheckoutDto;

    if (products.length === 0) {
      throw new BadRequestException('Product not exist');
    }

    products?.map(
      async (data) =>
        await this.orderModel.(
          { _id: data.productId },
          {
            $set: {
              quantity:
            },
          },
          { new: true },
        ),
    );

    return 'This action adds a new checkout';
  }
}

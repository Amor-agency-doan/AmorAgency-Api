import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsSeed } from '~/modules/products/seeds/products.seed';
import { Products, ProductsSchema } from '~/modules/products/products.schema';

@Module({
  imports: [
    CommandModule,
    MongooseModule.forFeature([
      { name: Products.name, schema: ProductsSchema },
    ]),
  ],
  providers: [ProductsSeed],
})
export class SeedsModule {}

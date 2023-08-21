import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsSeed } from '~/modules/products/seeds/products.seed';
import { Products, ProductsSchema } from '~/modules/products/products.schema';
import { AccountSeed } from '~/modules/account/seeds/account.seed';
import { Account, AccountSchema } from '~/modules/account/account.schema';

@Module({
  imports: [
    CommandModule,
    MongooseModule.forFeature([
      { name: Products.name, schema: ProductsSchema },
      { name: Account.name, schema: AccountSchema },
    ]),
  ],
  providers: [ProductsSeed, AccountSeed],
})
export class SeedsModule {}

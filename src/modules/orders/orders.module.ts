import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController, UserOrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './order.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])],
  controllers: [OrdersController, UserOrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule { }

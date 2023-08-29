import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { BaseSchema } from 'src/decorators';
import { BaseMongo } from 'src/common/dto';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';
import { EOrderStatus } from '~/constants';

export type OrderDocument = Order & Document;

@BaseSchema()
export class Order extends BaseMongo {
  @Prop({ required: true })
  @ApiProperty()
  name: string;

  @Prop({ default: null })
  @ApiProperty()
  type: string;

  @Prop({ default: 0 })
  @ApiProperty()
  quantity: number;

  @Prop({ default: 0 })
  @ApiProperty()
  total: number;

  @Prop({ default: 0 })
  @ApiProperty()
  discount: number;

  @Prop({ default: null })
  @ApiProperty()
  thumbnail: string;

  @Prop({ default: null })
  @ApiProperty()
  link: string;

  @Prop({ default: EOrderStatus.PENDING })
  @ApiProperty({ enum: EOrderStatus, default: EOrderStatus.PENDING })
  status: EOrderStatus;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
OrderSchema.plugin(mongooseLeanVirtuals);

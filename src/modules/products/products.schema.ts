import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { BaseSchema } from 'src/decorators';
import { BaseMongo } from 'src/common/dto';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

export type ProductsDocument = Products & Document;

@BaseSchema()
export class Products extends BaseMongo {
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
  price: number;

  @Prop({ default: 0 })
  @ApiProperty()
  discount: number;

  @Prop({ default: null })
  @ApiProperty()
  thumbnail: string;

  @Prop({ default: null })
  @ApiProperty()
  link: string;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
ProductsSchema.plugin(mongooseLeanVirtuals);

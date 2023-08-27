import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { BaseSchema } from 'src/decorators';
import { BaseMongo } from 'src/common/dto';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

export type FeedbacksDocument = Feedbacks & Document;

@BaseSchema()
export class Feedbacks extends BaseMongo {
  @Prop({ required: true })
  @ApiProperty()
  name: string;

  @Prop({ default: null })
  @ApiProperty()
  email: string;

  @Prop({ default: null })
  @ApiProperty()
  service: string;

  @Prop({ default: 0 })
  @ApiProperty()
  budget: number;

  @Prop({ default: 0 })
  @ApiProperty()
  contact: number;

  @Prop({ default: null })
  @ApiProperty()
  message: string;

  @Prop({ default: false })
  @ApiProperty()
  isReply: boolean;
}

export const FeedbacksSchema = SchemaFactory.createForClass(Feedbacks);
FeedbacksSchema.plugin(mongooseLeanVirtuals);

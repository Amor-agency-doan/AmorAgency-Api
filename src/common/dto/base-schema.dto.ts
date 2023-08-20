import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class BaseMongo {
  @Prop()
  @ApiProperty()
  id: string;

  @Prop()
  @ApiProperty()
  _id: string;

  @Prop({ type: Date, required: true })
  @ApiProperty()
  createdAt: Date;

  @Prop({ type: Date, required: true })
  @ApiProperty()
  updatedAt: Date;
}

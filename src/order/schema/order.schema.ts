/* eslint-disable prettier/prettier */
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Order {
  @Prop()
  id: number;

  @Prop({ Type: Date })
  createdAt: Date;

  @Prop()
  products: Array<any>;

  @Prop()
  userId: number;
}

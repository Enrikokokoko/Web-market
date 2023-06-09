/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Product } from '../../product/schema/product.schema'
import { User } from '../../user/schema/user.schema'

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  products: Product[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop({ type: Date })
  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order)
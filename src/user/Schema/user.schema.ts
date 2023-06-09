/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  balance: number;

  @Prop()
  password: string;

  @Prop({ type: Date })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User)
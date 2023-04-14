/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document} from 'mongoose'; 

export type AuthDocument = Auth & Document

@Schema()
export class Auth {
  @Prop()
  username: string;

  @Prop()
  password: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth)
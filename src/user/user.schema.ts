import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  u_id: number;
  @Prop({ required: true, unique: true })
  name: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  balance: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;

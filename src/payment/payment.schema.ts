import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Payment {
  @Prop({ required: true, unique: true })
  r_id: number;
  @Prop({ required: true })
  user_id: string;
  @Prop({ required: true })
  ammount: number;
  @Prop({ required: true })
  u_id: number;
}
export const PaymentSchema = SchemaFactory.createForClass(Payment);
export type PaymentDocument = Payment & Document;

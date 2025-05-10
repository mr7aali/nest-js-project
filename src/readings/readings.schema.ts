import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Reading {
  @Prop({ required: true, unique: true })
  r_id: number;

  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  value: number;

  @Prop({ required: true })
  u_id: number;
  @Prop({ required: true })
  unit: number;
  @Prop({ required: true, type: Object })
  date: { day: number; month: number; year: number };
}
export const ReadingSchema = SchemaFactory.createForClass(Reading);
export type ReadingDocument = Reading & Document;

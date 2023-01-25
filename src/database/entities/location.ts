import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Coordinates {
  @Prop({ required: true })
  lat: number;
  
  @Prop({ required: true })
  lng: number;
}
export const CoordinatesSchema = SchemaFactory.createForClass(Coordinates);

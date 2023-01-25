import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Coordinates, CoordinatesSchema } from './location';

export type StationDocument = HydratedDocument<Station>;

@Schema({
  _id: true,
  timeseries: {
    timeField: 'createdAt',
  },
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
})
export class Station {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true, type: CoordinatesSchema })
  coordinates: Coordinates;
}

export const StationSchema = SchemaFactory.createForClass(Station);

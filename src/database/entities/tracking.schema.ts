import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { Coordinates, CoordinatesSchema } from './location';
import { ObjectId } from 'mongodb';
import { COLLECTIONS } from './collections';

export type TrackingDocument = HydratedDocument<Tracking>;
export type TrackingModel = Model<TrackingDocument>;

@Schema({
  _id: true,
  timeseries: {
    timeField: 'createdAt',
    metaField: 'metadata',
  },
  timestamps: { createdAt: true, updatedAt: true },
})
export class Tracking {
  @Prop({ required: true, type: CoordinatesSchema })
  coordinates: Coordinates;

  @Prop({ required: true, type: ObjectId, ref: COLLECTIONS.BATTERY })
  battery: ObjectId;

  @Prop({ required: true, type: ObjectId }) // ref: COLLECTIONS.DRIVER
  driver: ObjectId;

  @Prop({ required: true, default: false }) // ID of swap related to this Battery
  isCalculated: boolean;
}

export const TrackingSchema = SchemaFactory.createForClass(Tracking);

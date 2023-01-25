import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model, Types } from 'mongoose';

export type BatteryDocument = HydratedDocument<Battery>;
export type BatteryModel = Model<BatteryDocument>;

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
export class Battery {
  @Prop()
  capacity: number;

  @Prop({ type: Types.Subdocument })
  details: Object; // Other battery details
}

export const BatterySchema = SchemaFactory.createForClass(Battery);

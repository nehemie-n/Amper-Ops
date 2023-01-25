import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { COLLECTIONS } from './collections';

export type SwapDocument = HydratedDocument<Swap>;
export type SwapModel = Model<SwapDocument>;

@Schema({
  _id: true,
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
})
export class Swap {
  /**
   * Determines if it is swap in or swap out
   */
  @Prop({ required: true })
  in: Boolean;

  /**
   * References
   */
  @Prop({ required: true, type: ObjectId }) // ref: COLLECTIONS.STAFF
  staff: ObjectId;

  @Prop({ required: true, type: ObjectId, ref: COLLECTIONS.STATION })
  station: ObjectId;

  @Prop({ required: true, type: ObjectId, ref: COLLECTIONS.BATTERY })
  battery: ObjectId;

  @Prop({ required: true, type: ObjectId }) // ref: COLLECTIONS.DRIVER
  driver: ObjectId;

  @Prop({ required: true })
  batteryPower: number; // Current battery power
  /**
   * If it is swap in
   * Giving  in a battery
   */
  @Prop({})
  distance: number;

  @Prop({})
  charge: number; // in RWF

  @Prop({})
  powerUsed: number;
}

export const SwapSchema = SchemaFactory.createForClass(Swap);

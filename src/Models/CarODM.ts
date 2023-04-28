import { Schema } from 'mongoose';
import AbstractODM from './AbstractODM';
import ICars from '../Interfaces/ICar';

export default class CarsODM extends AbstractODM<ICars> {
  constructor() {
    const schema = new Schema<ICars>(
      {
        model: { type: String, required: true },
        year: { type: Number, required: true },
        color: { type: String, required: true },
        buyValue: { type: Number, required: true },
        doorsQty: { type: Number, required: true },
        seatsQty: { type: Number, required: true },
        status: { type: Boolean, required: false },
      },
      {
        versionKey: false,
      }
    );
    super(schema, 'Cars');
  }
}

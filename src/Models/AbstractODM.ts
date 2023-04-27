import { Schema, Model, models, model } from 'mongoose';
// import ICar from '../Interfaces/ICar';

export default class AbstractODM<T> {
  private schema: Schema;
  private model: Model<T>;

  constructor(schema: Schema, documentModel: string) {
    this.schema = schema;
    this.model = models[documentModel] || model(documentModel, this.schema);
  }

  public async create(car: T): Promise<T> {
    return this.model.create({ ...car });
  }
}

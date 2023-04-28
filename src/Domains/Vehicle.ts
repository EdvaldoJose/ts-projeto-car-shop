import IVehicle from '../Interfaces/IVehicle';

export default class Vehicle {
  protected id?: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status?: boolean | undefined;
  protected buyValue: number;

  constructor({ model, year, color, buyValue, id, status }: IVehicle) {
    this.model = model;
    this.year = year;
    this.color = color;
    this.buyValue = buyValue;
    this.id = id;
    this.status = status || false;
  }
}

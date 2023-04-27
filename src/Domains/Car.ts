import ICar from '../Interfaces/ICar';

export default class Car {
  protected id?: string;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status: boolean;
  protected buyValue: number;
  protected doorsQty: number;
  protected seatsQty: number;

  constructor(objectCar: ICar) {
    this.id = objectCar.id;
    this.model = objectCar.model;
    this.year = objectCar.year;
    this.color = objectCar.color;
    this.status = objectCar.status || false;
    this.buyValue = objectCar.buyValue;
    this.doorsQty = objectCar.doorsQty;
    this.seatsQty = objectCar.seatsQty;
  }

  setId(id: string): void {
    this.id = id;
  }

  setDoorsQty(doorsQty: number): void {
    this.doorsQty = doorsQty;
  }

  setSeatsQty(seatsQty: number): void {
    this.seatsQty = seatsQty;
  }

  getId(): string | undefined {
    if (this.id) return this.id;
    return undefined;
  }

  getModel(): string {
    return this.model;
  }

  getYear(): number {
    return this.year;
  }

  getColor(): string {
    return this.color;
  }

  getStatus(): boolean | undefined {
    if (this.status) return this.status;
    return undefined;
  }

  getBuyValue(): number {
    return this.buyValue;
  }

  getDoorsQty(): number {
    return this.doorsQty;
  }

  getSeatsQty(): number {
    return this.seatsQty;
  }
}

import ICar from '../Interfaces/ICar';
import Vehicle from './Vehicle';

export default class Car extends Vehicle {
  private _doorsQty: number;
  private _seatsQty: number;

  constructor({ model, year, color, buyValue, doorsQty, seatsQty, id, status }: ICar) {
    super({ model, year, color, buyValue, id, status });
    this._doorsQty = doorsQty;
    this._seatsQty = seatsQty;
  }

  public CarModel() {
    return {
      id: this.id,
      model: this.model,
      year: this.year,
      color: this.color,
      status: this.status,
      buyValue: this.buyValue,
      doorsQty: this._doorsQty,
      seatsQty: this._seatsQty,
    };
  }

  public async UpdateVehicle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const resultUpdate = await this.carsService.UpdateCar(req.body, req.params.id);
      return res.status(200).json(resultUpdate);
    } catch (error) {
      next(error);
    }
  }
}

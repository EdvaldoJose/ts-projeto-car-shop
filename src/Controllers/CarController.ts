import { NextFunction, Request, Response } from 'express';
import CarsODM from '../Models/CarODM';
import CarsService from '../Services/CarsService';
import ICar from '../Interfaces/ICar';

export default class CarController {
  constructor(private carsService = new CarsService(new CarsODM())) {}

  public async createCar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const car: ICar = { ...req.body };
    try {
      const carCreated = await this.carsService.createCar(car);
      return res.status(201).json(carCreated);
    } catch (error) {
      next(error);
    }
  }
}

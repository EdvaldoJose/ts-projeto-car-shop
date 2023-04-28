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

  public async findAllCars(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const carCreated = await this.carsService.findAllCars();
      return res.status(200).json(carCreated);
    } catch (error) {
      next(error);
    }
  }

  public async findCarById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const carCreated = await this.carsService.findCars(req.params.id);
      return res.status(200).json(carCreated);
    } catch (error) {
      next(error);
    }
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

  public async DeleteVehicle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      await this.carsService.DeleteCar(req.params.id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

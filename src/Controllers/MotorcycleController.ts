import { NextFunction, Request, Response } from 'express';
import MotorcycleODM from '../Models/MotorcycleODM';
import MotorcycleService from '../Services/MotorcycleService';
import IMotorcycle from '../Interfaces/IMotorcycle';

export default class MotorcycleController {
  constructor(private motorcycleService = new MotorcycleService(new MotorcycleODM())) {}

  public async createMotorCycle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    const moto: IMotorcycle = { ...req.body };
    try {
      const carCreated = await this.motorcycleService.createMotor(moto);
      return res.status(201).json(carCreated);
    } catch (error) {
      next(error);
    }
  }

  public async findAllMotoCycles(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const motoCreated = await this.motorcycleService.findAllMotors();
      return res.status(200).json(motoCreated);
    } catch (error) {
      next(error);
    }
  }

  public async findMotorById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const motoCreated = await this.motorcycleService.findMotors(req.params.id);
      return res.status(200).json(motoCreated);
    } catch (error) {
      next(error);
    }
  }

  public async UpdateMotorcycle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> {
    try {
      const resultUpdate = await this.motorcycleService.UpdateMoto(req.body, req.params.id);
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
      await this.motorcycleService.DeleteCar(req.params.id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

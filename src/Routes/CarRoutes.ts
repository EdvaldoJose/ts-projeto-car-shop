import { Request, Response, Router, NextFunction } from 'express';
import CarController from '../Controllers/CarController';

const carsController = new CarController();

const carsRouter = Router();

carsRouter.post('/', (req: Request, res: Response, next: NextFunction) =>
  carsController.createCar(req, res, next));

carsRouter.get('/:id', (req: Request, res: Response, next: NextFunction) =>
  carsController.findCarById(req, res, next));

carsRouter.get('/', (req: Request, res: Response, next: NextFunction) =>
  carsController.findAllCars(req, res, next));

carsRouter.put('/:id', (req: Request, res: Response, next: NextFunction) =>
  carsController.UpdateVehicle(req, res, next));

carsRouter.delete('/:id', (req: Request, res: Response, next: NextFunction) =>
  carsController.DeleteVehicle(req, res, next));

export default carsRouter;

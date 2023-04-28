import { Request, Response, Router, NextFunction } from 'express';
import CarController from '../Controllers/CarController';

const carsController = new CarController();

const carsRouter = Router();

carsRouter.post('/', (req: Request, res: Response, next: NextFunction) =>
  carsController.createCar(req, res, next)
);

export default carsRouter;

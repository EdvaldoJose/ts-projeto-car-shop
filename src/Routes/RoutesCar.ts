import { Router } from 'express';
import CarController from '../Controllers/CarController';

const RoutesCar = Router();

RoutesCar.post('/cars', (req, res, _next) => new CarController(req, res).create());

export default RoutesCar;
//

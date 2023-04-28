import express from 'express';
import carsRouter from './Routes/CarRoutes';
import ErrorHandler from './Middlewares/ErrorHandler';
import motorcycleRouter from './Routes/MotorcycleRoutes';

const app = express();

app.use(express.json());

app.use('/cars', carsRouter);

app.use('/motorcycles', motorcycleRouter);

app.use(ErrorHandler.handle);

export default app;

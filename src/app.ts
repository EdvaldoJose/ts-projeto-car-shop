import express from 'express';
import carsRouter from './Routes/CarRoutes';
import ErrorHandler from './Middlewares/ErrorHandler';

const app = express();

app.use(express.json());

app.use('/cars', carsRouter);

app.use(ErrorHandler.handle);

export default app;

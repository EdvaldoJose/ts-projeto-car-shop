import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarsODM from '../Models/CarODM';

export default class CarsService {
  private _modelODM: CarsODM;
  readonly invalidMongoId: string = 'Invalid mongo id';
  readonly carNotFound: string = 'Car not found';

  constructor(modelODM: CarsODM) {
    this._modelODM = modelODM;
  }

  public async createCar(objCar: ICar): Promise<ICar | null> {
    const created = await this._modelODM.create(objCar);
    return new Car(created).CarModel();
  }
}

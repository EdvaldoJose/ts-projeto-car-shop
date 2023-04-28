import Motorcycle from '../Domains/Motorcycles';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
// import ErrorTeste from '../utils/Errors';

export default class MotorcycleService {
  private _modelODM: MotorcycleODM;
  readonly invalidMongoId: string = 'Invalid mongo id';
  readonly carNotFound: string = 'Motorcycle not found';

  constructor(modelODM: MotorcycleODM) {
    this._modelODM = modelODM;
  }

  public async createMotor(objMoto: IMotorcycle): Promise<IMotorcycle | null> {
    const created = await this._modelODM.create(objMoto);
    return new Motorcycle(created).MotorCycleModel();
  }
}

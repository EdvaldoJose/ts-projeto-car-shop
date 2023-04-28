import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycles';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import ErrorTeste from '../utils/Errors';

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

  public async findMotors(id: string): Promise<IMotorcycle | null> {
    if (!isValidObjectId(id)) throw new ErrorTeste(this.invalidMongoId, 422);
    const motors = await this._modelODM.findById(id);
    if (motors === null) throw new ErrorTeste(this.carNotFound, 404);
    return new Motorcycle(motors).MotorCycleModel();
  }

  public async findAllMotors(): Promise<IMotorcycle[] | null> {
    const motors = await this._modelODM.findAll();
    const result = motors.map((moto: IMotorcycle) => ({
      id: moto.id,
      model: moto.model,
      year: moto.year,
      color: moto.color,
      status: moto.status,
      buyValue: moto.buyValue,
      category: moto.category,
      engineCapacity: moto.engineCapacity,
    }));

    return result;
  }
}

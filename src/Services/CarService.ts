import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

export default class CarService {
  private createCarDomains(car: ICar) {
    return new Car(car);
  }

  //   private createCarDomains(car: ICar[]) {
  //     const array = car.map((element) => new Car(element));
  //     return array;
  //   }

  //
  public async createCar(car: ICar) {
    const carResult = car;

    if (car.status === undefined) carResult.status = false;

    const carODM = new CarODM();
    const newCar = await carODM.create(carResult);

    return this.createCarDomains(newCar);
  }
}

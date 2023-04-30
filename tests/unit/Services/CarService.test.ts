import { expect } from 'chai';
import Sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import CarsODM from '../../../src/Models/CarODM';
import CarsService from '../../../src/Services/CarsService';
import TypeError from '../../../src/utils/Errors';

describe('Teste a camada Model Cars', function () {
  it('Criando um novo car', async function () {
    // Arrange
    const bodyCar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };

    const newCar: ICar = {
      id: '6348513f34c397abcad040b2',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };
    // Action
    Sinon.stub(Model, 'create').resolves(newCar);
    const service = new CarsService(new CarsODM());
    const carCreated = await service.createCar(bodyCar);
    // Assertion
    expect(carCreated).to.be.deep.equal(newCar);
  });

  it('Lista os veiculos', async function () {
    // Arrange
    const listCar = [
      {
        id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      },
      {
        id: '634852326b35b59438fbea31',
        model: 'Tempra',
        year: 1995,
        color: 'Black',
        status: 'false',
        buyValue: 39,
        doorsQty: 2,
        seatsQty: 5,
      },
    ];
    // Action
    Sinon.stub(Model, 'find').resolves(listCar);
    const service = new CarsService(new CarsODM());
    const carCreated = await service.findAllCars();
    // Assertion
    expect(carCreated).to.be.deep.equal(listCar);
  });

  it('Buscando veiculo por id', async function () {
    // Arrange
    const car = {
      id: '6348513f34c397abcad040b2',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };

    const id = '6348513f34c397abcad040b2';
    // Action
    Sinon.stub(Model, 'findById').resolves(car);
    const service = new CarsService(new CarsODM());
    const carCreated = await service.findCars(id);
    // Assertion
    expect(carCreated).to.be.deep.equal(car);
  });

  it('Buscando veiculo por id mongodb incorreto', async function () {
    // Arrange
    const id = '6348513f34c745454725154';
    // Action
    Sinon.stub(Model, 'findById').resolves(null);
    const service = new CarsService(new CarsODM());
    // Assertiion
    try {
      await service.findCars(id);
    } catch (error) {
      expect((error as TypeError).message).to.be.deep.equal('Invalid mongo id');
    }
  });

  it('Buscando vieculo por id que nao exista', async function () {
    // Arrange
    const id = '634852326b35b59438fbea2f';
    // Action
    Sinon.stub(Model, 'findById').resolves(null);
    const service = new CarsService(new CarsODM());
    // Assertion
    try {
      await service.findCars(id);
    } catch (error) {
      expect((error as TypeError).message).to.be.deep.equal('Car not found');
    }
  });

  it('Atualizando um veiculo com id errado', async function () {
    // Arrange
    const id = '634852326b35b59438fbea22';
    const carUpdate = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };
    // Action
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
    const service = new CarsService(new CarsODM());
    // Assertion
    try {
      await service.UpdateCar(carUpdate, id);
    } catch (error) {
      expect((error as TypeError).message).to.be.deep.equal('Car not found');
    }
  });

  it('Atualizando o veiculo com o mongoId errado', async function () {
    // Arrange
    const id = 'invalid_id';
    const carUpdate = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };
    // Action
    const service = new CarsService(new CarsODM());
    // Assertion
    try {
      await service.UpdateCar(carUpdate, id);
    } catch (error) {
      expect((error as TypeError).message).to.be.deep.equal('Invalid mongo id');
    }
  });

  it('Atualizando o veiculo com sucesso', async function () {
    // Arrange
    const id = '6348513f34c397abcad040b2';
    const car = {
      id: '6348513f34c397abcad040b2',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };

    const carUpdate = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    };
    // Action
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(car);
    const service = new CarsService(new CarsODM());
    const result = await service.UpdateCar(carUpdate, id);
    // Assertion
    expect(result).to.be.deep.equal(car);
  });

  afterEach(function () {
    Sinon.restore();
  });
});

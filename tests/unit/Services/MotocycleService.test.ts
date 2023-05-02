import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleODM from '../../../src/Models/MotorcycleODM';
import TypeError from '../../../src/utils/Errors';
import MotorcycleService from '../../../src/Services/MotorcycleService';

const modelName = 'Honda Cb 600f Hornet';

describe('Testes da Model Motorcycle', function () {
  it('Criando uma nova moto', async function () {
    // Arrange
    const bodyMoto = {
      model: modelName,
      year: 2014,
      color: 'Red',
      status: true,
      buyValue: 45.0,
      category: 'Street',
      engineCapacity: 600,
    };
    const newMoto: IMotorcycle = {
      id: '634852326b35b59438fbea2f',
      model: modelName,
      year: 2014,
      color: 'Red',
      status: true,
      buyValue: 45.0,
      category: 'Street',
      engineCapacity: 600,
    };
    // Action
    Sinon.stub(Model, 'create').resolves(newMoto);
    const service = new MotorcycleService(new MotorcycleODM());
    const motoCreated = await service.createMotor(bodyMoto);
    // Assertion
    expect(motoCreated).to.be.deep.equal(newMoto);
  });

  it('Listando as Motocycles', async function () {
    // Arrange
    const listMotors = [
      {
        id: '634852326b35b59438fbea2f',
        model: modelName,
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.0,
        category: 'Street',
        engineCapacity: 600,
      },
      {
        id: '634852326b35b59438fbea31',
        model: 'Honda Cbr 1000rr',
        year: 2011,
        color: 'Orange',
        status: true,
        buyValue: 59.9,
        category: 'Street',
        engineCapacity: 1000,
      },
    ];
    // Action
    Sinon.stub(Model, 'find').resolves(listMotors);
    const service = new MotorcycleService(new MotorcycleODM());
    const motoList = await service.findAllMotors();
    // Assertion
    expect(motoList).to.be.deep.equal(listMotors);
  });

  it('Buscando uma moto por id', async function () {
    // Arrange
    const motor = {
      id: '634852326b35b59438fbea31',
      model: modelName,
      year: 2011,
      color: 'Orange',
      status: true,
      buyValue: 59.9,
      category: 'Street',
      engineCapacity: 1000,
    };
    const id = '634852326b35b59438fbea31';
    // Action
    Sinon.stub(Model, 'findById').resolves(motor);
    const service = new MotorcycleService(new MotorcycleODM());
    const motorSearch = await service.findMotors(id);
    // Assertion
    expect(motorSearch).to.be.deep.equal(motor);
  });

  it('Buscando uma moto por id mongodb incorreto', async function () {
    // Arrange
    const id = '5729374598237498578920';
    // Action
    Sinon.stub(Model, 'findById').resolves(null);
    const service = new MotorcycleService(new MotorcycleODM());
    // Assertion
    try {
      await service.findMotors(id);
    } catch (error) {
      expect((error as TypeError).message).to.be.deep.equal('Invalid mongo id');
    }
  });

  it('Buscando uma moto por id que nao existe', async function () {
    // Arrange
    const id = '634852326b35b59438fbea31';
    // Action
    Sinon.stub(Model, 'findById').resolves(null);
    const service = new MotorcycleService(new MotorcycleODM());
    // Assertion
    try {
      await service.findMotors(id);
    } catch (error) {
      expect((error as TypeError).message).to.be.deep.equal('Motorcycle not found');
    }
  });

  it('Atualizar uma motorcycle com o id errado', async function () {
    // Arrange
    const id = '634852326b35b59438fbea88';
    const motoUpdate = {
      model: modelName,
      year: 2014,
      color: 'Red',
      status: true,
      buyValue: 45.0,
      category: 'Street',
      engineCapacity: 600,
    };
    // Action
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
    const service = new MotorcycleService(new MotorcycleODM());
    // Assertion
    try {
      await service.UpdateMoto(motoUpdate, id);
    } catch (error) {
      expect((error as TypeError).message).to.be.deep.equal('Motorcycle not found');
    }
  });

  it('Atualizando um motorcycle com o mogodb errado', async function () {
    // Arrager
    const id = 'invalid_id';
    const motoUpdate = {
      id: '634852326b35b59438fbea2f',
      model: modelName,
      year: 2014,
      color: 'Red',
      status: true,
      buyValue: 45.0,
      category: 'Street',
      engineCapacity: 600,
    };
    // Action
    const service = new MotorcycleService(new MotorcycleODM());
    // Assertion
    try {
      await service.UpdateMoto(motoUpdate, id);
    } catch (error) {
      expect((error as TypeError).message).to.be.deep.equal('Invalid mongo id');
    }
  });

  it('Atualizando uma moto com sucesso', async function () {
    // Arranger
    const id = '634852326b35b59438fbea2f';
    const moto = {
      id: '634852326b35b59438fbea2f',
      model: modelName,
      year: 2014,
      color: 'Red',
      status: true,
      buyValue: 45.0,
      category: 'Street',
      engineCapacity: 600,
    };
    const motoUpdate = {
      model: modelName,
      year: 2014,
      color: 'Red',
      status: true,
      buyValue: 45.0,
      category: 'Street',
      engineCapacity: 600,
    };
    // Action
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(moto);
    const service = new MotorcycleService(new MotorcycleODM());
    const result = await service.UpdateMoto(motoUpdate, id);
    // Assertion
    expect(result).to.be.deep.equal(moto);
  });

  afterEach(function () {
    Sinon.restore();
  });
});

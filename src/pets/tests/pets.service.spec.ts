import { Test, TestingModule } from '@nestjs/testing';
import { PetsService } from '../pets.service';
import { PetEntity } from '../entities/pet.entity';
import { CreatePetDto } from '../dto/create-pet.dto';
import { SpeciesEntity } from '../entities/species.entity';
import { plainToClass } from 'class-transformer';
import { getRepositoryToken } from '@nestjs/typeorm';

const catSpecies: SpeciesEntity = plainToClass(SpeciesEntity, {
  id: 1,
  key: 'cat',
  name: 'Cat',
});

const dogSpecies: SpeciesEntity = plainToClass(SpeciesEntity, {
  id: 2,
  key: 'dog',
  name: 'Dog',
});

const pet: PetEntity = plainToClass(PetEntity, {
  id: '1e8114f2-fc67-4b88-8864-90e4cb86019c',
  name: 'Fluffy',
  dob: '2015-07-20',
  species: catSpecies,
});

const PetsRepositoryMock = {
  create: jest.fn((petData) => Promise.resolve(petData)),
  find: jest.fn(() => Promise.resolve([pet])),
  save: jest.fn((petData) => Promise.resolve(pet)),
};

const SpeciesRepositoryMock = {
  findOneByOrFail: jest.fn(({ key }) => {
    return key === catSpecies.key ? catSpecies : dogSpecies;
  }),
};

describe('PetsService', () => {
  let service: PetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PetsService,
        {
          provide: getRepositoryToken(PetEntity),
          useValue: PetsRepositoryMock,
        },
        {
          provide: getRepositoryToken(SpeciesEntity),
          useValue: SpeciesRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<PetsService>(PetsService);
  });

  it('can get all pets', async () => {
    const result = await service.findAll();

    expect(PetsRepositoryMock.find).toHaveBeenCalledTimes(1);
    expect(PetsRepositoryMock.find).toHaveBeenCalledWith({
      relations: ['species'],
    });

    expect(result).toEqual([pet]);
  });

  it('can create a pet', async () => {
    // Setup
    const inputData: CreatePetDto = {
      name: 'Foo',
      dob: new Date('2015-07-20'),
      speciesKey: 'cat',
    };

    // Action
    const result = await service.createPet(inputData);

    // Assertions
    expect(PetsRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(PetsRepositoryMock.create).toHaveBeenCalledWith({
      name: 'Foo',
      dob: new Date('2015-07-20'),
      species: catSpecies,
    });

    expect(PetsRepositoryMock.save).toHaveBeenCalledTimes(1);
    expect(PetsRepositoryMock.save).toHaveBeenCalledWith({
      name: 'Foo',
      dob: new Date('2015-07-20'),
      species: catSpecies,
    });

    expect(SpeciesRepositoryMock.findOneByOrFail).toHaveBeenCalledTimes(1);
    expect(SpeciesRepositoryMock.findOneByOrFail).toHaveBeenCalledWith({
      key: 'cat',
    });

    expect(result).toEqual(pet);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PetsService } from '../pets.service';
import { PetEntity } from '../entities/pet.entity';
import { SpeciesEntity } from '../entities/species.entity';
import { plainToClass } from 'class-transformer';
import { getRepositoryToken } from '@nestjs/typeorm';

const catSpecies: SpeciesEntity = plainToClass(SpeciesEntity, {
  id: 1,
  key: 'cat',
  name: 'Cat',
});

const pet: PetEntity = plainToClass(PetEntity, {
  id: '1e8114f2-fc67-4b88-8864-90e4cb86019c',
  name: 'Fluffy',
  dob: '2015-07-20',
  species: catSpecies,
});

const PetsRepositoryMock = {
  find: jest.fn(() => Promise.resolve([pet])),
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
});

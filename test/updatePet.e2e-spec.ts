import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PetsService } from '../src/pets/pets.service';
import { SpeciesEntity } from '../src/pets/entities/species.entity';
import { plainToClass } from 'class-transformer';
import { PetEntity } from '../src/pets/entities/pet.entity';

describe('Pet store API', () => {
  let app: INestApplication;

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

  const petsServiceMock = {
    findPetById: jest.fn((id) => Promise.resolve(pet)),
    updatePet: jest.fn((petEntity, data) => Promise.resolve(data)),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PetsService)
      .useValue(petsServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('can update the pet', async () => {
    const payload = {
      name: 'Foo',
      dob: '2015-05-20',
      speciesKey: 'cat',
    };
    const response = await request(app.getHttpServer())
      .put('/pets/test-id')
      .send(payload)
      .expect(HttpStatus.OK)
      .expect(payload);

    expect(petsServiceMock.findPetById).toHaveBeenCalledTimes(1);
    expect(petsServiceMock.findPetById).toHaveBeenCalledWith('test-id');

    expect(petsServiceMock.updatePet).toHaveBeenCalledTimes(1);
    expect(petsServiceMock.updatePet).toHaveBeenCalledWith(pet, payload);

    return response;
  });

  it('cannot update a pet without a name', async () => {
    const response = await request(app.getHttpServer())
      .put('/pets/test-id')
      .send({
        name: '',
      })
      .expect(HttpStatus.BAD_REQUEST);

    expect(response.body.message).toHaveLength(1);
    expect(response.body.message[0]).toContain('name');

    return response;
  });

  it('cannot update a pet without a dob', async () => {
    const response = await request(app.getHttpServer())
      .put('/pets/test-id')
      .send({
        dob: '',
      })
      .expect(HttpStatus.BAD_REQUEST);

    expect(response.body.message).toHaveLength(1);
    expect(response.body.message[0]).toContain('dob');

    return response;
  });

  it('cannot update a pet without species', async () => {
    const response = await request(app.getHttpServer())
      .put('/pets/test-id')
      .send({
        speciesKey: '',
      })
      .expect(HttpStatus.BAD_REQUEST);

    expect(response.body.message).toHaveLength(1);
    expect(response.body.message[0]).toContain('speciesKey');

    return response;
  });

  it('cannot update a pet with invalid species', async () => {
    const response = await request(app.getHttpServer())
      .put('/pets/test-id')
      .send({
        speciesKey: 'unknown_species',
      })
      .expect(HttpStatus.BAD_REQUEST);

    expect(response.body.message).toHaveLength(1);
    expect(response.body.message[0]).toContain('speciesKey');

    return response;
  });

  afterEach(async () => {
    await app.close();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PetsService } from '../src/pets/pets.service';

describe('Pet store API', () => {
  let app: INestApplication;

  const petsServiceMock = {
    findAll: jest.fn(() => {
      return Promise.resolve('test');
    }),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PetsService)
      .useValue(petsServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  it('can get all pets', async () => {
    const response = await request(app.getHttpServer())
      .get('/pets')
      .expect(HttpStatus.OK)
      .expect('test');

    expect(petsServiceMock.findAll).toHaveBeenCalledTimes(1);
    expect(petsServiceMock.findAll).toHaveBeenCalledWith();

    return response;
  });

  afterEach(async () => {
    await app.close();
  });
});

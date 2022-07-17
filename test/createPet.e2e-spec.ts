import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PetsService } from '../src/pets/pets.service';

describe('Pet store API', () => {
  let app: INestApplication;

  const petsServiceMock = {
    createPet: jest.fn((data) => {
      return Promise.resolve(`${data.name}|${data.dob}|${data.speciesKey}`);
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
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('can create a pet', async () => {
    const response = await request(app.getHttpServer())
      .post('/pets')
      .send({
        name: 'Foo',
        dob: '2015-05-20',
        speciesKey: 'cat',
      })
      .expect(HttpStatus.CREATED)
      .expect('Foo|2015-05-20|cat');

    expect(petsServiceMock.createPet).toHaveBeenCalledTimes(1);
    expect(petsServiceMock.createPet).toHaveBeenCalledWith({
      name: 'Foo',
      dob: '2015-05-20',
      speciesKey: 'cat',
    });

    return response;
  });

  it('cannot create a pet without a name', async () => {
    const response = await request(app.getHttpServer())
      .post('/pets')
      .send({
        name: '',
        dob: '2015-05-20',
        speciesKey: 'cat',
      })
      .expect(HttpStatus.BAD_REQUEST);

    expect(response.body.message[0]).toContain('name');

    return response;
  });

  it('cannot create a pet without a dob', async () => {
    const response = await request(app.getHttpServer())
      .post('/pets')
      .send({
        name: 'Foo',
        dob: '',
        speciesKey: 'cat',
      })
      .expect(HttpStatus.BAD_REQUEST);

    expect(response.body.message[0]).toContain('dob');

    return response;
  });

  it('cannot create a pet without species', async () => {
    const response = await request(app.getHttpServer())
      .post('/pets')
      .send({
        name: 'Foo',
        dob: '2015-05-20',
        speciesKey: '',
      })
      .expect(HttpStatus.BAD_REQUEST);

    expect(response.body.message[0]).toContain('speciesKey');

    return response;
  });

  it('cannot create a pet with invalid species', async () => {
    const response = await request(app.getHttpServer())
      .post('/pets')
      .send({
        name: 'Foo',
        dob: '2015-05-20',
        speciesKey: 'unknown_species',
      })
      .expect(HttpStatus.BAD_REQUEST);

    expect(response.body.message[0]).toContain('speciesKey');

    return response;
  });

  afterEach(async () => {
    await app.close();
  });
});

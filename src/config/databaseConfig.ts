import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { SpeciesEntity } from '../pets/entities/species.entity';
import { PetEntity } from '../pets/entities/pet.entity';

dotenv.config();

const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  dropSchema: false,
  synchronize: false,
  migrationsRun: true,
  migrations: [join(__dirname, '..', 'migrations/*.{ts,js}')],
  migrationsTableName: 'migrations_history',
  entities: [SpeciesEntity, PetEntity],
};

export default databaseConfig;

import { Injectable } from '@nestjs/common';
import { PetEntity } from './entities/pet.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { SpeciesEntity } from './entities/species.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(PetEntity)
    private petsRepository: Repository<PetEntity>,

    @InjectRepository(SpeciesEntity)
    private speciesRepository: Repository<SpeciesEntity>,
  ) {}

  findAll(): Promise<PetEntity[]> {
    return this.petsRepository.find({
      relations: ['species'],
    });
  }

  async createPet(data: CreatePetDto): Promise<PetEntity> {
    const { speciesKey, ...petData } = data;
    const species = await this.findSpeciesByKey(data.speciesKey);
    const newPet = await this.petsRepository.create({
      ...petData,
      species,
    });

    return this.petsRepository.save(newPet);
  }

  findSpeciesByKey(key: string): Promise<SpeciesEntity> {
    return this.speciesRepository.findOneByOrFail({
      key: key,
    });
  }
}

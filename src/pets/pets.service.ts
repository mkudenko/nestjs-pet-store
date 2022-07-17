import { Injectable } from '@nestjs/common';
import { PetEntity } from './entities/pet.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { SpeciesEntity } from './entities/species.entity';
import { UpdatePetDto } from './dto/update-pet.dto';
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

  async updatePet(pet: PetEntity, data: UpdatePetDto): Promise<PetEntity> {
    const { speciesKey, ...petData } = data;
    const isSpeciesUpdated =
      data?.speciesKey && data?.speciesKey !== pet.species.key;
    if (isSpeciesUpdated) {
      const species = await this.findSpeciesByKey(data.speciesKey);
      await this.petsRepository.update(pet.id, { ...petData, species });
    } else {
      await this.petsRepository.update(pet.id, petData);
    }

    return this.findPetById(pet.id);
  }

  findPetById(id: string): Promise<PetEntity> {
    return this.petsRepository.findOneOrFail({
      where: {
        id: id,
      },
      relations: ['species'],
    });
  }

  findSpeciesByKey(key: string): Promise<SpeciesEntity> {
    return this.speciesRepository.findOneByOrFail({
      key: key,
    });
  }
}

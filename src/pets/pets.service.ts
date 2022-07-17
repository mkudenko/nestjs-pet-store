import { Injectable } from '@nestjs/common';
import { PetEntity } from './entities/pet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(PetEntity)
    private petsRepository: Repository<PetEntity>,
  ) {}

  findAll(): Promise<PetEntity[]> {
    return this.petsRepository.find({
      relations: ['species'],
    });
  }
}

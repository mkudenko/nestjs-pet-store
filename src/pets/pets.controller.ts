import { Controller, Get } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetEntity } from './entities/pet.entity';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get()
  async index(): Promise<PetEntity[]> {
    return this.petsService.findAll();
  }
}

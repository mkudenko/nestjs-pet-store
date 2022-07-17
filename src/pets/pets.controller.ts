import { Body, Controller, Get, Post } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetEntity } from './entities/pet.entity';
import { CreatePetDto } from './dto/create-pet.dto';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get()
  async index(): Promise<PetEntity[]> {
    return this.petsService.findAll();
  }

  @Post()
  async create(@Body() createPetDto: CreatePetDto): Promise<PetEntity> {
    return this.petsService.createPet(createPetDto);
  }
}

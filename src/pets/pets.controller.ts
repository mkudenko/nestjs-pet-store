import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetEntity } from './entities/pet.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetByIdPipe } from './pipes/pet-by-id.pipe';

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

  @Put(':id')
  async update(
    @Param('id', PetByIdPipe) pet: PetEntity,
    @Body() updatePetDto: UpdatePetDto,
  ): Promise<PetEntity> {
    return this.petsService.updatePet(pet, updatePetDto);
  }
}

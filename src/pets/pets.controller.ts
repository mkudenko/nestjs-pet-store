import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetEntity } from './entities/pet.entity';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetByIdPipe } from './pipes/pet-by-id.pipe';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@Controller('pets')
@ApiTags('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Get()
  @ApiOperation({ summary: 'View all pets' })
  @ApiOkResponse({
    description: 'Array of pets',
    type: PetEntity,
    isArray: true,
  })
  async index(): Promise<PetEntity[]> {
    return this.petsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a pet' })
  @ApiBody({ description: 'Pet details', type: CreatePetDto })
  @ApiCreatedResponse({
    description: 'The pet record has been successfully created.',
    type: PetEntity,
  })
  async create(@Body() createPetDto: CreatePetDto): Promise<PetEntity> {
    return this.petsService.createPet(createPetDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing pet' })
  @ApiParam({
    name: 'id',
    type: 'string',
    example: '1e8114f2-fc67-4b88-8864-90e4cb86019c',
  })
  @ApiBody({ description: 'Updated pet details', type: UpdatePetDto })
  @ApiOkResponse({
    description: 'The pet record has been successfully updated.',
    type: PetEntity,
  })
  async update(
    @Param('id', PetByIdPipe) pet: PetEntity,
    @Body() updatePetDto: UpdatePetDto,
  ): Promise<PetEntity> {
    return this.petsService.updatePet(pet, updatePetDto);
  }
}

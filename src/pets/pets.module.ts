import { Module } from '@nestjs/common';
import { PetEntity } from './entities/pet.entity';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { PetByIdPipe } from './pipes/pet-by-id.pipe';
import { SpeciesEntity } from './entities/species.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SpeciesEntity, PetEntity])],
  controllers: [PetsController],
  providers: [PetsService, PetByIdPipe],
  exports: [TypeOrmModule],
})
export class PetsModule {}

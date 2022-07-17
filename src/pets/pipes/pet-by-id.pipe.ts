import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { PetEntity } from '../entities/pet.entity';
import { PetsService } from '../pets.service';

@Injectable()
export class PetByIdPipe implements PipeTransform<string, Promise<PetEntity>> {
  constructor(private petsService: PetsService) {}

  transform(value: any, metadata: ArgumentMetadata) {
    return this.petsService.findPetById(value);
  }
}

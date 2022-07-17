import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePetDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  dob: Date;

  @IsString()
  @IsNotEmpty()
  @IsIn(['cat', 'dog', 'rabbit'])
  @IsOptional()
  speciesKey: string;
}

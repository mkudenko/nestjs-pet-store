import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePetDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  dob?: Date;

  @IsString()
  @IsIn(['cat', 'dog', 'rabbit'])
  @IsOptional()
  speciesKey?: string;
}

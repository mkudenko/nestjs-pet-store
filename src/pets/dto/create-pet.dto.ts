import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePetDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Fluffy' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ example: '2018-07-29', format: 'YYYY-MM-DD' })
  dob: Date;

  @IsString()
  @IsNotEmpty()
  @IsIn(['cat', 'dog', 'rabbit'])
  @IsOptional()
  @ApiProperty({
    example: 'cat',
    description: 'Accepted values are: cat, dog, rabbit',
  })
  speciesKey: string;
}

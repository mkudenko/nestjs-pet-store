import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePetDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Fluffy' })
  name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiPropertyOptional({ example: '2018-07-29', format: 'YYYY-MM-DD' })
  dob?: Date;

  @IsString()
  @IsIn(['cat', 'dog', 'rabbit'])
  @IsOptional()
  @ApiPropertyOptional({
    example: 'cat',
    description: 'Accepted values are: cat, dog, rabbit',
  })
  speciesKey?: string;
}

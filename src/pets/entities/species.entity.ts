import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('species')
export class SpeciesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @ApiProperty({
    description: 'Unique species key. Used in API requests.',
    example: 'cat',
  })
  key: string;

  @Column()
  @ApiProperty({ description: 'Species name', example: 'Cat' })
  name: string;
}

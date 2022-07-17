import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SpeciesEntity } from './species.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('pets')
export class PetEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: '1e8114f2-fc67-4b88-8864-90e4cb86019c' })
  public id: string;

  @Column()
  @ApiProperty({ description: 'Name of the pet', example: 'Fluffy' })
  public name: string;

  @Column({ type: 'date' })
  @ApiProperty({
    description: 'Date of birth in YYYY-mm-dd format',
    example: '2018-07-29',
  })
  public dob: Date;

  @ManyToOne(() => SpeciesEntity)
  @JoinColumn({ name: 'species_id' })
  @ApiProperty({ type: SpeciesEntity })
  public species: SpeciesEntity;
}

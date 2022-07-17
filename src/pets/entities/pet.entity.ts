import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SpeciesEntity } from './species.entity';

@Entity('pets')
export class PetEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column({ type: 'date' })
  public dob: Date;

  @ManyToOne(() => SpeciesEntity)
  @JoinColumn({ name: 'species_id' })
  public species: SpeciesEntity;
}

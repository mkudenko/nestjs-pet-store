import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('species')
export class SpeciesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  key: string;

  @Column()
  name: string;
}

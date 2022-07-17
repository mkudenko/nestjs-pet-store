import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { PetEntity } from '../pets/entities/pet.entity';
import { SpeciesEntity } from '../pets/entities/species.entity';

export class createPetsTable1658028442584 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const petsTable = new Table({
      name: 'pets',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true,
          default: 'uuid_generate_v4()',
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'dob',
          type: 'date',
        },
        {
          name: 'species_id',
          type: 'int4',
        },
      ],
      foreignKeys: [
        {
          columnNames: ['species_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'species',
          onDelete: 'CASCADE',
        },
      ],
    });

    await queryRunner.createTable(petsTable);

    const allSpecies = await queryRunner.manager
      .getRepository(SpeciesEntity)
      .createQueryBuilder('species')
      .getMany();

    await queryRunner.manager
      .getRepository(PetEntity)
      .createQueryBuilder('pets')
      .insert()
      .into(PetEntity)
      .values([
        {
          name: 'Kitty',
          dob: '2015-03-15',
          species: allSpecies.find((s) => s.key === 'cat'),
        },
        {
          name: 'Doggy',
          dob: '2018-07-14',
          species: allSpecies.find((s) => s.key === 'dog'),
        },
        {
          name: 'Rabbitty',
          dob: '2022-02-20',
          species: allSpecies.find((s) => s.key === 'rabbit'),
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pets');
  }
}

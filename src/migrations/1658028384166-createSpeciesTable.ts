import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { SpeciesEntity } from '../pets/entities/species.entity';

export class createSpeciesTable1658028384166 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'species',
      columns: [
        {
          name: 'id',
          type: 'int4',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'rowid',
        },
        {
          name: 'key',
          type: 'varchar',
          isUnique: true,
        },
        {
          name: 'name',
          type: 'varchar',
        },
      ],
    });

    await queryRunner.createTable(table);

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(SpeciesEntity)
      .values([
        { key: 'cat', name: 'Cat' },
        { key: 'dog', name: 'Dog' },
        { key: 'rabbit', name: 'Rabbit' },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('species');
  }
}

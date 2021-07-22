import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class RentalsMigration1626908560021 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'rentals',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          generationStrategy: 'uuid',
          isPrimary: true,
          isGenerated: true,
        },
        {
          name: 'car_id',
          type: 'uuid',
        },
        {
          name: 'user_id',
          type: 'uuid',
        },
        {
          name: 'start_date',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'end_date',
          type: 'timestamp',
          isNullable: true,
          default: null,
        },
        {
          name: 'expected_return_date',
          type: 'timestamp',
        },
        {
          name: 'total',
          type: 'numeric',
          isNullable: true,
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
        },
      ],
      foreignKeys: [
        {
          name: 'FKCarRental',
          referencedTableName: 'cars',
          referencedColumnNames: ['id'],
          columnNames: ['car_id'],
        },
        {
          name: 'FKUserRental',
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          columnNames: ['user_id'],

        }],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('rentals');
  }
}

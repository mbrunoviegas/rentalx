import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CarsImageMigration1626882917384 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'cars_image',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          generationStrategy: 'uuid',
          isGenerated: true,
          isPrimary: true,
        },
        {
          name: 'car_id',
          type: 'uuid',
        },
        {
          name: 'image_name',
          type: 'varchar',
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        },
      ],
      foreignKeys: [
        {
          name: 'FKImageCar',
          referencedTableName: 'cars',
          referencedColumnNames: ['id'],
          columnNames: ['car_id'],
          onDelete: 'SET NULL',
          onUpdate: 'SET NULL',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cars_image');
  }
}

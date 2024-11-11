import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

class CreateAdminsTable1731324230476 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'admins',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'int',
            generationStrategy: 'increment',
            isGenerated: true,
            isPrimary: true,
          }),
          new TableColumn({
            name: 'name',
            type: 'varchar',
            isNullable: false,
            length: '255',
          }),
          new TableColumn({
            name: 'email',
            type: 'varchar',
            isNullable: false,
            length: '255',
          }),
          new TableColumn({
            name: 'password',
            type: 'varchar',
            isNullable: false,
            length: '255',
          }),
          new TableColumn({
            name: 'is_active',
            type: 'bool',
            default: true,
            isNullable: false,
          }),
          new TableColumn({
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'NOW()',
            isNullable: false,
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('posts');
  }
}

export default CreateAdminsTable1731324230476;

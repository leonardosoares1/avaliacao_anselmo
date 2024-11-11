import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

class CreatePostsTable1731324230476 implements MigrationInterface {
  name?: string | undefined;
  transaction?: boolean | undefined;
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'posts',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'int',
            generationStrategy: 'increment',
            isGenerated: true,
            isPrimary: true,
          }),
          new TableColumn({
            name: 'title',
            type: 'varchar',
            isNullable: false,
            length: '255',
          }),
          new TableColumn({
            name: 'subtitle',
            type: 'varchar',
            isNullable: false,
            length: '255',
          }),
          new TableColumn({
            name: 'thumbnail',
            type: 'varchar',
            isNullable: false,
            length: '255',
          }),
          new TableColumn({
            name: 'content',
            type: 'text',
            isNullable: false,
          }),
          new TableColumn({
            name: 'count_likes',
            type: 'int',
            default: 0,
            isNullable: false,
          }),
          new TableColumn({
            name: 'count_shares',
            type: 'int',
            default: 0,
            isNullable: false,
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

export default CreatePostsTable1731324230476;

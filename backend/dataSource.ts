import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'dockerlocal',
  password: 'docker',
  database: 'teste',
  entities: [],
  migrations: ['./src/shared/infra/database/typeorm/migrations/*.ts'],
  migrationsTableName: 'migrations',
});

export default dataSource;

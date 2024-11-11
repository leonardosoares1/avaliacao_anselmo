import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'local',
  password: 'local_123',
  database: 'teste',
  entities: [],
  migrations: ['./src/shared/infra/database/typeorm/migrations/*.ts'],
  migrationsTableName: 'migrations',
});

export default dataSource;

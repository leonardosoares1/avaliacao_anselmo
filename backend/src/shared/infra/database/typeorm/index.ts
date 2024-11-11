import { DataSource } from 'typeorm';

import databaseConfig from '@config/database';

import AdminMapper from '@modules/admins/infra/typeorm/mappers/AdminMapper';
import PostMapper from '@modules/posts/infra/typeorm/mappers/PostMapper';

const TypeOrmDataSource = new DataSource({
  type: 'postgres',
  host: databaseConfig.host,
  port: databaseConfig.port,
  username: databaseConfig.username,
  password: databaseConfig.password,
  database: databaseConfig.database,
  entities: [AdminMapper, PostMapper],
});

export default TypeOrmDataSource;

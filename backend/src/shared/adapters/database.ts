import TypeOrmDataSource from '../infra/database/typeorm';
import Adapter from '../infra/database/typeorm/adapter';

const databaseAdapter = new Adapter(TypeOrmDataSource);

export default databaseAdapter;

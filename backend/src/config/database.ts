interface IDatabaseConfig {
  database: string;
  host: string;
  password: string;
  port: number;
  username: string;
}

const databaseConfig: IDatabaseConfig = {
  host: process.env.DB_HOST ?? '',
  port: Number(process.env.DB_PORT) ?? 0,
  username: process.env.DB_USERNAME ?? '',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_NAME ?? '',
};

export default databaseConfig;

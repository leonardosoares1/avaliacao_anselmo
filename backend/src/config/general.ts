interface IGeneralConfig {
  enableLogs: boolean;
  environment: string;
  name: string;
  port: number;
}

const generalConfig: IGeneralConfig = {
  enableLogs: !!Number(process.env.ENABLE_LOGS),
  environment: process.env.NODE_ENV ?? 'development',
  name: 'Avaliação - Backend',
  port: Number(process.env.PORT) ?? 0,
};

export default generalConfig;

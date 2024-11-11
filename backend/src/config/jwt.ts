interface IJwtConfig {
  expiresIn: string;
  secret: string;
}

const jwtConfig: IJwtConfig = {
  expiresIn: '1d',
  secret: process.env.JWT_SECRET || '',
};

export default jwtConfig;

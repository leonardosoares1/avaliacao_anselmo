import { JwtPayload, sign, verify } from 'jsonwebtoken';

import jwtConfig from '@config/jwt';

import DecodeTokenOutputData from '../dtos/decodeToken/OutputData';
import GenerateTokenInputData from '../dtos/generateToken/InputData';
import ITokenProvider from '../ITokenProvider';

interface IJwtVerifyResponse extends JwtPayload {
  id: number;
}

class JsonWebTokenProvider implements ITokenProvider {
  public decode(token: string): DecodeTokenOutputData {
    const { id } = verify(token, jwtConfig.secret) as IJwtVerifyResponse;
    const outputData = new DecodeTokenOutputData({
      id,
    });
    return outputData;
  }

  public generate(inputData: GenerateTokenInputData): string {
    const tokenGenerated = sign(inputData.payload, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });
    return tokenGenerated;
  }
}

export default JsonWebTokenProvider;

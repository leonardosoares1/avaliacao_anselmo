import DecodeTokenOutputData from './dtos/decodeToken/OutputData';
import GenerateTokenInputData from './dtos/generateToken/InputData';

interface ITokenProvider {
  decode(token: string): DecodeTokenOutputData;
  generate(inputData: GenerateTokenInputData): string;
}

export default ITokenProvider;

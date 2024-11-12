import ICreateInputData from './dtos/create/InputData';
import ICreateOutputData from './dtos/create/OutputData';
import ISignInInputData from './dtos/signIn/InputData';
import ISignInOutputData from './dtos/signIn/OutputData';

interface IAuthRepository {
  create(inputData: ICreateInputData): Promise<ICreateOutputData>;
  signIn(inputData: ISignInInputData): Promise<ISignInOutputData>;
}

export default IAuthRepository;

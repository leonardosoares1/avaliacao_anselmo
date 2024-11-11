import IGetAllInputData from './dtos/getAll/InputData';
import IGetAllOutputData from './dtos/getAll/OutputData';

interface IPostRepository {
  getAll(inputData: IGetAllInputData): Promise<IGetAllOutputData>;
}

export default IPostRepository;

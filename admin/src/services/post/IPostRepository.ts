import ICreateInputData from './dtos/create/InputData';
import IGetAllInputData from './dtos/getAll/InputData';
import IGetAllOutputData from './dtos/getAll/OutputData';
import IGetDetailsInputData from './dtos/getDetails/InputData';
import IGetDetailsOutputData from './dtos/getDetails/OutputData';
import IUpdateInputData from './dtos/update/InputData';

interface IPostRepository {
  create(inputData: ICreateInputData): Promise<void>;
  getAll(inputData: IGetAllInputData): Promise<IGetAllOutputData>;
  getDetails(
    inputData: IGetDetailsInputData,
  ): Promise<IGetDetailsOutputData | undefined>;
  update(inputData: IUpdateInputData): Promise<void>;
}

export default IPostRepository;

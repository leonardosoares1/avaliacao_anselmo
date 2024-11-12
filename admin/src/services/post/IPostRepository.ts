import ICreateInputData from './dtos/create/InputData';
import IDisableInputData from './dtos/disable/InputData';
import IEnableInputData from './dtos/enable/InputData';
import IGetAllInputData from './dtos/getAll/InputData';
import IGetAllOutputData from './dtos/getAll/OutputData';
import IGetDetailsInputData from './dtos/getDetails/InputData';
import IGetDetailsOutputData from './dtos/getDetails/OutputData';
import IUpdateInputData from './dtos/update/InputData';

interface IPostRepository {
  create(inputData: ICreateInputData): Promise<void>;
  disable(inputData: IDisableInputData): Promise<void>;
  enable(inputData: IEnableInputData): Promise<void>;
  getAll(inputData: IGetAllInputData): Promise<IGetAllOutputData>;
  getDetails(
    inputData: IGetDetailsInputData,
  ): Promise<IGetDetailsOutputData | undefined>;
  update(inputData: IUpdateInputData): Promise<void>;
}

export default IPostRepository;

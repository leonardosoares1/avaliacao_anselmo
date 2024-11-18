import IGetAllInputData from './dtos/getAll/InputData';
import IGetAllOutputData from './dtos/getAll/OutputData';
import IGetDetailsInputData from './dtos/getDetails/InputData';
import IGetDetailsOutputData from './dtos/getDetails/OutputData';
import ILikeInputData from './dtos/like/InputData';
import IShareInputData from './dtos/share/InputData';

interface IPostRepository {
  getAll(inputData: IGetAllInputData): Promise<IGetAllOutputData>;
  getDetails(inputData: IGetDetailsInputData): Promise<IGetDetailsOutputData>;
  like(inputData: ILikeInputData): Promise<void>;
  share(inputData: IShareInputData): Promise<void>;
}

export default IPostRepository;

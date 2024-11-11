import CreatePostInputData from './dtos/postRepository/create/InputData';
import CreatePostOutputData from './dtos/postRepository/create/OutputData';

interface IPostRepository {
  create(inputData: CreatePostInputData): Promise<CreatePostOutputData>;
}

export default IPostRepository;

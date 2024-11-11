import CreatePostInputData from './dtos/postRepository/create/InputData';
import CreatePostOutputData from './dtos/postRepository/create/OutputData';
import FindPostByIdOutputData from './dtos/postRepository/findById/OutputData';

interface IPostRepository {
  create(inputData: CreatePostInputData): Promise<CreatePostOutputData>;
  findById(id: number): Promise<FindPostByIdOutputData | undefined>;
}

export default IPostRepository;

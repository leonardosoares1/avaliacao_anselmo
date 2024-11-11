import CreatePostInputData from './dtos/postRepository/create/InputData';
import CreatePostOutputData from './dtos/postRepository/create/OutputData';
import FindPostByIdOutputData from './dtos/postRepository/findById/OutputData';
import UpdatePostInputData from './dtos/postRepository/update/InputData';

interface IPostRepository {
  create(inputData: CreatePostInputData): Promise<CreatePostOutputData>;
  disable(id: number): Promise<void>;
  enable(id: number): Promise<void>;
  findById(id: number): Promise<FindPostByIdOutputData | undefined>;
  update(inputData: UpdatePostInputData): Promise<void>;
}

export default IPostRepository;

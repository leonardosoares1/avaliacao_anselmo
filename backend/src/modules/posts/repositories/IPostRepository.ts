import CountPostsInputData from './dtos/postRepository/count/InputData';
import CreatePostInputData from './dtos/postRepository/create/InputData';
import CreatePostOutputData from './dtos/postRepository/create/OutputData';
import FindPostByIdOutputData from './dtos/postRepository/findById/OutputData';
import GetPostsInputData from './dtos/postRepository/get/InputData';
import GetPostsOutputData from './dtos/postRepository/get/OutputData';
import UpdatePostInputData from './dtos/postRepository/update/InputData';

interface IPostRepository {
  count(inputData: CountPostsInputData): Promise<number>;
  create(inputData: CreatePostInputData): Promise<CreatePostOutputData>;
  disable(id: number): Promise<void>;
  enable(id: number): Promise<void>;
  findById(id: number): Promise<FindPostByIdOutputData | undefined>;
  get(inputData: GetPostsInputData): Promise<GetPostsOutputData>;
  update(inputData: UpdatePostInputData): Promise<void>;
}

export default IPostRepository;

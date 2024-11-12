import IPostRepository from '@modules/posts/repositories/IPostRepository';

interface IAbstractFactory {
  createPostRepository(): IPostRepository;
}

export default IAbstractFactory;

import CompareHashInputData from './dtos/compare/InputData';

interface IHashProvider {
  compare(inputData: CompareHashInputData): Promise<boolean>;
}

export default IHashProvider;

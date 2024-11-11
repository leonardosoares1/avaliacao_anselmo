import bcryptjs from 'bcryptjs';

import CompareHashInputData from '../dtos/compare/InputData';
import IHashProvider from '../IHashProvider';

class BCryptProvider implements IHashProvider {
  public async compare(inputData: CompareHashInputData): Promise<boolean> {
    const isEqual = await bcryptjs.compare(inputData.raw, inputData.hashed);
    return isEqual;
  }
}

export default BCryptProvider;

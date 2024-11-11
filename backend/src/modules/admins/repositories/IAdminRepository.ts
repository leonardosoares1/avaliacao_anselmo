import FindAdminByIdOutputData from './dtos/adminRepository/findAdminById/OutputData';
import FindAdminByEmailOutputData from './dtos/adminRepository/findByEmail/OutputData';

interface IAdminRepository {
  findByEmail(email: string): Promise<FindAdminByEmailOutputData | undefined>;
  findById(id: number): Promise<FindAdminByIdOutputData | undefined>;
}

export default IAdminRepository;

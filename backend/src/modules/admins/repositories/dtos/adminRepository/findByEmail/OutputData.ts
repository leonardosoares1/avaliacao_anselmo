class FindAdminByEmailOutputData {
  public readonly id: number;

  public readonly isActive: boolean;

  public readonly password: string;

  constructor({
    id,
    isActive,
    password,
  }: {
    id: number;
    isActive: boolean;
    password: string;
  }) {
    this.id = id;
    this.isActive = isActive;
    this.password = password;
  }
}

export default FindAdminByEmailOutputData;

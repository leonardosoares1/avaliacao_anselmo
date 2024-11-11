class OutputData {
  public readonly email: string;

  public readonly id: number;

  public readonly name: string;

  constructor({
    email,
    id,
    name,
  }: {
    email: string;
    id: number;
    name: string;
  }) {
    this.email = email;
    this.id = id;
    this.name = name;
  }
}

export default OutputData;

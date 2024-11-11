class CompareHashInputData {
  public readonly hashed: string;

  public readonly raw: string;

  constructor({ hashed, raw }: { hashed: string; raw: string }) {
    this.hashed = hashed;
    this.raw = raw;
  }
}

export default CompareHashInputData;

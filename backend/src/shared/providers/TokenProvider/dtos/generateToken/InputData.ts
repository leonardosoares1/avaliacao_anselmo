class GenerateTokenInputData {
  public readonly payload: Record<string, unknown>;

  constructor({ payload }: { payload: Record<string, unknown> }) {
    this.payload = payload;
  }
}

export default GenerateTokenInputData;

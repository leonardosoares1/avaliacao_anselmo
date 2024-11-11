class CaughtError {
  private readonly error: unknown;

  constructor(error: unknown) {
    this.error = error;
  }

  public getMessage(): string {
    if (this.error instanceof Error) {
      return this.error.message;
    }
    return String(this.error);
  }
}

export default CaughtError;

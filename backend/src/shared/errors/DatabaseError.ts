class DatabaseError extends Error {
  public readonly message: string;

  constructor(message: string) {
    super();

    this.message = message;
  }
}

export default DatabaseError;

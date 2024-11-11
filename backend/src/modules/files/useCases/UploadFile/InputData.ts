class InputData {
  public readonly filename?: string;

  public readonly file?: Express.Multer.File;

  constructor({
    file,
    filename,
  }: {
    file?: Express.Multer.File;
    filename?: string;
  }) {
    this.filename = filename;
    this.file = file;
  }
}

export default InputData;

class InputData {
  public readonly isActive?: boolean;

  public readonly page?: number;

  public readonly rowsPerPages?: number;

  public readonly title?: string;

  constructor({
    isActive,
    page,
    rowsPerPages,
    title,
  }: {
    isActive?: boolean;
    page?: number;
    rowsPerPages?: number;
    title?: string;
  }) {
    this.isActive = isActive;
    this.page = page;
    this.rowsPerPages = rowsPerPages;
    this.title = title;
  }
}

export default InputData;

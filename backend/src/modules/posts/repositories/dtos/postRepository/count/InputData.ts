class CountPostsInputData {
  public readonly filterIsActive?: boolean;

  public readonly filterTitle?: string;

  constructor({
    filterIsActive,
    filterTitle,
  }: {
    filterIsActive?: boolean;
    filterTitle?: string;
  }) {
    this.filterIsActive = filterIsActive;
    this.filterTitle = filterTitle;
  }
}

export default CountPostsInputData;

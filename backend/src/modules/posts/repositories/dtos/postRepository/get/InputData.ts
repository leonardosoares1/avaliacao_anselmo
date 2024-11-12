class GetPostsInputData {
  public readonly filterIsActive?: boolean;

  public readonly filterTitle?: string;

  public readonly paginationLimit?: number;

  public readonly paginationOffset?: number;

  constructor({
    filterIsActive,
    filterTitle,
    paginationLimit,
    paginationOffset,
  }: {
    filterIsActive?: boolean;
    filterTitle?: string;
    paginationLimit?: number;
    paginationOffset?: number;
  }) {
    this.filterIsActive = filterIsActive;
    this.filterTitle = filterTitle;
    this.paginationLimit = paginationLimit;
    this.paginationOffset = paginationOffset;
  }
}

export default GetPostsInputData;

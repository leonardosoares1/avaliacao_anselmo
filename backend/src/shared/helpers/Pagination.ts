class Pagination {
  private readonly page: number;

  private readonly rowsPerPage: number;

  constructor(inputData: { page?: number; rowsPerPage?: number }) {
    this.page = inputData?.page || 0;
    this.rowsPerPage = inputData?.rowsPerPage || 20;
  }

  public getPage(): number {
    return this.page;
  }

  public getRowsPerPage(): number {
    if (this.page === 0) {
      return 0;
    }
    return this.rowsPerPage;
  }

  public calculateTotalPages(totalRows: number): number {
    const totalPages = Math.ceil(totalRows / this.getRowsPerPage());
    return totalPages;
  }

  public calculateSkip(): number {
    const page = this.getPage();
    const rowsPerPage = this.getRowsPerPage();
    if (page === 0) {
      return 0;
    }
    const quantitySkipped = (page - 1) * rowsPerPage;
    return quantitySkipped;
  }
}

export default Pagination;

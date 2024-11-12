interface IGetAllInputData {
  is_active?: '0' | '1';
  page?: number;
  rows_per_page?: number;
  title?: string;
}

export default IGetAllInputData;

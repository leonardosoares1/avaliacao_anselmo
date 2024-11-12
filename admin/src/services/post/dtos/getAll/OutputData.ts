interface IGetAllOutputData {
  list: {
    content: string;
    id: number;
    isActive: boolean;
    subtitle: string;
    thumbnail: string;
    title: string;
  }[];
  pagination: {
    current: number;
    total: number;
  };
}

export default IGetAllOutputData;

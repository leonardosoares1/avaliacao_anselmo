interface IGetAllOutputData {
  list: {
    counterLikes: number;
    counterShares: number;
    id: number;
    isActive: boolean;
    subtitle: string;
    thumbnail: string;
    title: string;
  }[];
  pagination: {
    current_page: number;
    total_page: number;
  };
}

export default IGetAllOutputData;

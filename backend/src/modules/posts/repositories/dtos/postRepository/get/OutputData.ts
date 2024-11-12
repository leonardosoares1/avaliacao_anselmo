interface IListItem {
  counterLikes: number;
  counterShares: number;
  id: number;
  isActive: boolean;
  subtitle: string;
  thumbnail: string;
  title: string;
}

class GetPostsOutputData {
  public readonly list: IListItem[];

  constructor({ list }: { list: IListItem[] }) {
    this.list = list;
  }
}

export default GetPostsOutputData;

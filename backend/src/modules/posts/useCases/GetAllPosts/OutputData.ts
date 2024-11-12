interface IList {
  counterLikes: number;
  counterShared: number;
  id: number;
  isActive: boolean;
  subtitle: string;
  thumbnail: string;
  title: string;
}

class OutputData {
  public readonly list: IList[];

  public readonly pages?: number;

  constructor({ list, pages }: { list: IList[]; pages?: number }) {
    this.list = list;
    this.pages = pages;
  }
}

export default OutputData;

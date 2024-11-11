class OutputData {
  public readonly content: string;
  public readonly id: number;
  public readonly isActive: boolean;
  public readonly subtitle: string;
  public readonly title: string;
  public readonly thumbnail: string;

  constructor({
    content,
    id,
    isActive,
    subtitle,
    thumbnail,
    title,
  }: {
    content: string;
    id: number;
    isActive: boolean;
    subtitle: string;
    thumbnail: string;
    title: string;
  }) {
    this.content = content;
    this.id = id;
    this.isActive = isActive;
    this.subtitle = subtitle;
    this.thumbnail = thumbnail;
    this.title = title;
  }
}

export default OutputData;

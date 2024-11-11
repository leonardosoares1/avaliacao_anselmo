class InputData {
  public readonly content: string;

  public readonly id: number;

  public readonly subtitle: string;

  public readonly thumbnail: string;

  public readonly title: string;

  constructor({
    content,
    id,
    subtitle,
    thumbnail,
    title,
  }: {
    content: string;
    id: number;
    subtitle: string;
    thumbnail: string;
    title: string;
  }) {
    this.content = content;
    this.id = id;
    this.subtitle = subtitle;
    this.thumbnail = thumbnail;
    this.title = title;
  }
}

export default InputData;

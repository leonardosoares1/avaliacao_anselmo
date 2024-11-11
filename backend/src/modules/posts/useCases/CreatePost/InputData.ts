class InputData {
  public readonly content: string;

  public readonly isActive: boolean;

  public readonly subtitle: string;

  public readonly thumbnail: string;

  public readonly title: string;

  constructor({
    content,
    isActive,
    subtitle,
    thumbnail,
    title,
  }: {
    content: string;
    isActive: boolean;
    subtitle: string;
    thumbnail: string;
    title: string;
  }) {
    this.content = content;
    this.isActive = isActive;
    this.subtitle = subtitle;
    this.thumbnail = thumbnail;
    this.title = title;
  }
}

export default InputData;

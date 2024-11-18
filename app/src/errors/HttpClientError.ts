class HttpClientError extends Error {
  public body: any;

  public response: any;

  constructor({
    body,
    message,
    response,
  }: {
    body: any;
    message: string;
    response: any;
  }) {
    super(message);
    this.body = body;
    this.name = 'HttpClientError';
    this.response = response;
  }
}

export default HttpClientError;

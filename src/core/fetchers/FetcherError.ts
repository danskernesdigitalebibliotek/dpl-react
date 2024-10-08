export default class FetcherError<ContextType> extends Error {
  public readonly useErrorBoundary: boolean = false;

  public readonly name: string = "FetcherError";

  constructor(
    public readonly message: string,
    public readonly context?: ContextType
  ) {
    super(message);
  }
}

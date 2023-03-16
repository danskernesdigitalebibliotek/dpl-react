export default class InvalidUrlError<ContextType> extends Error {
  public readonly useErrorBoundary: boolean = false;

  public readonly name: string = "InvalidUrlError";

  constructor(
    public readonly message: string,
    public readonly context?: ContextType
  ) {
    super(message);
  }
}

import HttpError from "../utils/errors/HttpError";

export default class FetcherHttpError<
  ContextType
> extends HttpError<ContextType> {
  public readonly useErrorBoundary: boolean = false;
  public readonly responseBody?: unknown;

  constructor(
    public readonly status: number,
    public readonly message: string,
    public readonly context?: ContextType,
    responseBody?: unknown
  ) {
    super(status, message, context);
    this.responseBody = responseBody;
  }
}

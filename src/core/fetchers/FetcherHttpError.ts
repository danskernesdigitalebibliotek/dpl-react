import HttpError from "../utils/errors/HttpError";

export default class FetcherHttpError<
  ContextType
> extends HttpError<ContextType> {
  public readonly useErrorBoundary: boolean = false;

  constructor(
    public readonly status: number,
    public readonly message: string,
    public readonly context?: ContextType
  ) {
    super(status, message, context);
  }
}

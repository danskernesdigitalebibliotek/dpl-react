import { HttpError } from "http-error-classes";

export default class FetcherCriticalHttpError<
  ContextType
> extends HttpError<ContextType> {
  public readonly useErrorBoundary: boolean = true;

  constructor(
    public readonly status: number,
    public readonly message: string,
    public readonly context?: ContextType
  ) {
    super(status, message, context);
  }
}

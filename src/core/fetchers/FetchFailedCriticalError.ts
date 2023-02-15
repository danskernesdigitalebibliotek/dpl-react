import { FetcherError } from "./FetcherError";

export default class FetchFailedCriticalError<
  ContextType
> extends FetcherError<ContextType> {
  context: ContextType | undefined;

  public readonly name = "FetchFailedCriticalError";

  public readonly useErrorBoundary: boolean = true;

  constructor(message: string, context?: ContextType | undefined) {
    super(message);
    this.context = context;
  }
}
